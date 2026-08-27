import { useState } from "react";
import { Download, MoreVertical, Plus } from "lucide-react";
import { toast } from "sonner";
import FilterBar from "@/components/utils/FilterBar";
import Status from "@/components/utils/Status";
import Pager from "@/components/utils/Pager";
import Avatar from "@/components/Avatar";
import Heading from "@/components/Heading";

import { UserRole } from "@/types";
import UserShimmer from "../UserShimmer";
import { useUsers } from "@/lib/providers/UsersProvider";

export default function UsersPage() {
  const { users, isLoading, error, refetchUsers } = useUsers();
  const [role, setRole] = useState<UserRole>("USER");
  const [filters, setFilters] = useState({
    query: "",
    status: "ALL",
  });
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Filter users by role
  const roleUsers = users.filter((user) => user.role === role);

  // Apply search and status filters
  const filtered = roleUsers.filter(
    (user) =>
      `${user.fullName} ${user.username} ${user.email}`
        .toLowerCase()
        .includes(filters.query.toLowerCase()) &&
      (filters.status === "ALL" ||
        user.status?.toLowerCase() === filters.status.toLowerCase()),
  );

  const rows = users.slice((page - 1) * 5, page * 5);

  const getTitle = () => {
    switch (role) {
      case "TUTOR":
        return "All Tutors";
      case "ADMIN":
        return "All Admins";
      default:
        return "All Students";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "TUTOR":
        return "Tutor";
      case "ADMIN":
        return "Admin";
      default:
        return "Student";
    }
  };

  if (isLoading) {
    return (
      <>
        <Heading
          title={getTitle()}
          description="Manage students, tutors and admins"
          action="Add User"
          onAction={() => {
            toast.info("Add user functionality coming soon");
          }}
          exportData={filtered}
        />
        <UserShimmer />
      </>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-sm text-muted-foreground">{error}</p>
        <button
          onClick={refetchUsers}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  console.log(users);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{getTitle()}</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage students, tutors and admins
          </p>
        </div>
        <div className="flex gap-2">
          {(["USER", "TUTOR", "ADMIN"] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRole(r);
                setPage(1);
              }}
              className={`rounded-full border px-3.5 py-2 text-[11px] font-medium ${
                role === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {r === "USER" ? "Students" : r === "TUTOR" ? "Tutors" : "Admins"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <FilterBar
          type="people"
          onChange={(query, _category, status) => {
            setFilters({ query, status });
            setPage(1);
          }}
          onClear={() => {
            setFilters({ query: "", status: "ALL" });
            setPage(1);
          }}
        />
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={() => {
            toast.info("Export functionality coming soon");
          }}
          className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-[11px] font-semibold"
        >
          <Download className="size-3.5" />
          Export All
        </button>
        <button
          onClick={() => {
            toast.info("Add user functionality coming soon");
          }}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground"
        >
          <Plus className="size-3.5" />
          Add New
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[10px]">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground">
                <th className="px-4 py-3">{getRoleLabel(role)}</th>
                <th className="px-2 py-3">
                  {role === "TUTOR" ? "Course" : "Email"}
                </th>
                <th className="px-2 py-3">
                  {role === "TUTOR" ? "Students" : "Joined"}
                </th>
                <th className="px-2 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((user) => (
                <tr
                  key={user._id}
                  className="border-b last:border-0 hover:bg-muted/20"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={user.fullName}
                        imageUrl={user.profilePictureUrl}
                      />
                      <div>
                        <p className="font-semibold">{user.fullName}</p>
                        <p className="text-[9px] text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    {role === "TUTOR"
                      ? user.purchasedCourses?.length || 0
                      : user.email}
                  </td>
                  <td className="px-2 py-3">
                    {role === "TUTOR"
                      ? "N/A"
                      : new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-3">
                    <Status value={user.isVerified ? "Verified" : "Pending"} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === user.id ? null : user.id)
                      }
                      className="rounded-md p-1 hover:bg-muted"
                    >
                      <MoreVertical className="size-3.5 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager page={page} setPage={setPage} total={filtered.length} />
      </div>
    </>
  );
}
