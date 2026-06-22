"use client";

import { useUserProfile } from "@/hooks/useUserProfile";

/**
 * Demo component that renders a user profile fetched over GraphQL.
 * Drop it anywhere (e.g. in a profile or about view) to exercise the
 * Apollo Client wiring end-to-end:  <GraphQLUserCard userId={1} />
 */
export const GraphQLUserCard = ({ userId = 1 }: { userId?: number }) => {
  const { user, loading, error } = useUserProfile(userId);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading user…</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">GraphQL error: {error.message}</p>
    );
  }

  if (!user) {
    return <p className="text-sm text-slate-500">No user found.</p>;
  }

  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <div className="flex items-center gap-3">
        {user.profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.profileImage}
            alt={user.handle}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
        )}
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            {user.userFirstName} {user.userLastName}
          </p>
          <p className="text-sm text-slate-500">@{user.handle}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Fetched via GraphQL · {user.email}
      </p>
    </div>
  );
};
