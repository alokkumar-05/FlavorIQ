import { currentUser, auth } from "@clerk/nextjs/server";


const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    console.log("No user found");
    return null;
  }

  if (!STRAPI_API_TOKEN) {
    console.log("STRAPI_API_TOKEN is missing in .env.local");
    return null;
  }
  const { has } = await auth();
  const subscriptionTier = has({ role: "pro" }) ? "pro" : "free";

  try {
    const existingUserResponse = await fetch(
      `${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`,
      {

        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );
    if (!existingUserResponse.ok) {
      const errorText = await existingUserResponse.text();
      console.error("Strapi error response:", errorText);
      return null;
    }

    const existingUserData = await existingUserResponse.json();
    if (existingUserData.length > 0) {
      const existingUser = existingUserData[0];

      if (existingUser.subscriptionTier !== subscriptionTier) {
        await fetch(`${STRAPI_URL}/api/users/${existingUser.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriptionTier: subscriptionTier,
          }),
        })

      }
      return { ...existingUser, subscriptionTier };
    }

    const rolesResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    });

    if (!rolesResponse.ok) {
      const errorText = await rolesResponse.text();
      console.error("❌ Error fetching roles:", errorText);
      return null;
    }

    const rolesData = await rolesResponse.json();
    // Handle different Strapi response formats (v3, v4/v5, or plugins)
    const roles = Array.isArray(rolesData) ? rolesData :
      (Array.isArray(rolesData.roles) ? rolesData.roles :
        (Array.isArray(rolesData.data) ? rolesData.data : []));

    const authenticatedRole = roles.find(
      (role) => role.type === "authenticated"
    );

    if (!authenticatedRole) {
      console.error("❌ Error: No 'authenticated' role found in Strapi.");
      return null;
    }
    // Create new user
    const userData = {
      username:
        user.username || user.emailAddresses[0].emailAddress.split("@")[0],
      email: user.emailAddresses[0].emailAddress,
      password: `clerk_managed_${user.id}_${Date.now()}`,
      confirmed: true,
      blocked: false,
      role: authenticatedRole.id,
      clerkId: user.id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl || "",
      subscriptionTier,
    };

    const newUserResponse = await fetch(`${STRAPI_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(userData),
    });

    if (!newUserResponse.ok) {
      const errorText = await newUserResponse.text();
      console.error("❌ Error creating user:", errorText);
      return null;
    }

    const newUser = await newUserResponse.json();
    return newUser;
  } catch (error) {
    console.error("❌ Error in checkUser:", error.message);
    return null;
  }
};