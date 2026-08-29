import { useState } from "react";
import { Download, MoreVertical, Plus } from "lucide-react";
import { toast } from "sonner";
import FilterBar from "@/components/utils/FilterBar";
import Status from "@/components/utils/Status";
import Pager from "@/components/utils/Pager";
import Avatar from "@/components/Avatar";
import Heading from "@/components/Heading";

// import { UserRole } from "@/types";
import UserShimmer from "../UserShimmer";
import { useUsers } from "@/lib/providers/UsersProvider";
import { EUserRole, FilterBarType, UserStatus } from "@/enums";
import Button from "../Button";
import Modal from "../Modal";
import { User } from "@/types";
import { capitalizeEachWord } from "@/lib/utils";

export default function UsersPage() {
  const { users, isLoading, error, refetchUsers } = useUsers();
  const [role, setRole] = useState<EUserRole>(EUserRole.STUDENT);
  const [filters, setFilters] = useState<{ query: string; status: UserStatus }>(
    {
      query: "",
      status: UserStatus.ALL,
    },
  );
  const [selectedAction, setSelectedAction] = useState<{
    user: User;
    action: "user" | "tutor" | "admin";
  } | null>(null);
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
      (filters.status === UserStatus.ALL || user.status === filters.status),
  );
  const rows = filtered.slice((page - 1) * 5, page * 5);

  const getTitle = () => {
    switch (role) {
      case EUserRole.TUTOR:
        return "All Tutors";
      case EUserRole.ADMIN:
        return "All Admins";
      default:
        return "All Students";
    }
  };

  const getRoleLabel = (role: EUserRole) => {
    switch (role) {
      case EUserRole.TUTOR:
        return "Tutor";
      case EUserRole.ADMIN:
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
          {[EUserRole.ADMIN, EUserRole.STUDENT, EUserRole.TUTOR].map((r) => (
            <Button
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
              {r === EUserRole.STUDENT
                ? "Students"
                : r === EUserRole.TUTOR
                  ? "Tutors"
                  : "Admins"}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <FilterBar
          type={FilterBarType.USER}
          onChange={(query, _category, status) => {
            setFilters({
              query,
              status: status as UserStatus,
            });
            setPage(1);
          }}
          onClear={() => {
            setFilters({ query: "", status: UserStatus.ALL });
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
                  {role === EUserRole.TUTOR ? "Course" : "Email"}
                </th>
                <th className="px-2 py-3">
                  {role === EUserRole.TUTOR ? "Students" : "Joined"}
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
                    {role === EUserRole.TUTOR
                      ? user.purchasedCourses?.length || 0
                      : user.email}
                  </td>
                  <td className="px-2 py-3">
                    {role === EUserRole.TUTOR
                      ? "N/A"
                      : new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-3">
                    <Status value={user.status} />
                  </td>

                  <td className="px-4 py-3">
                    <div className="absolute">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(openMenu === user._id ? null : user._id)
                        }
                        className="rounded-md p-1 hover:bg-muted"
                      >
                        <MoreVertical className="size-3.5 text-muted-foreground" />
                      </button>

                      {openMenu === user._id && (
                        <>
                          {/* Click outside */}
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenu(null)}
                          />

                          {/* Menu */}
                          <div className="absolute ${} right-0 z-20 mt-1 flex w-32 flex-col rounded-lg border bg-card p-1 shadow-lg">
                            <Button
                              onClick={() => {
                                setOpenMenu(null);
                                setSelectedAction({
                                  user,
                                  action: "user",
                                });
                              }}
                              className="rounded px-2 py-1.5 text-left hover:bg-muted"
                            >
                              Make User
                            </Button>

                            <Button
                              onClick={() => {
                                setOpenMenu(null);
                                setSelectedAction({
                                  user,
                                  action: "tutor",
                                });
                              }}
                              className="rounded px-2 py-1.5 text-left hover:bg-muted"
                            >
                              Make Tutor
                            </Button>

                            <Button
                              onClick={() => {
                                setOpenMenu(null);
                                setSelectedAction({
                                  user,
                                  action: "admin",
                                });
                              }}
                              className="rounded px-2 py-1.5 text-left text-orange-500 hover:text-orange-600"
                            >
                              Make Admin
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager page={page} setPage={setPage} total={filtered.length} />
      </div>
      {selectedAction && (
        <Modal
          title={
            selectedAction.action === "admin"
              ? "Make User an Admin?"
              : selectedAction.action === "tutor"
                ? "Make User a Tutor?"
                : "Make User a Regular User?"
          }
          onClose={() => setSelectedAction(null)}
        >
          <div className="space-y-5">
            <p className="text-muted-foreground">
              You are about to change{" "}
              <span className="font-semibold text-foreground">
                {capitalizeEachWord(selectedAction.user.fullName)}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-foreground">
                {selectedAction.action === "admin"
                  ? "an administrator"
                  : selectedAction.action === "tutor"
                    ? "a tutor"
                    : "a regular user"}
              </span>
              .
            </p>

            <div
              className={`rounded-lg bg-muted/50 p-4 ${selectedAction.action === "admin" ? "rounded-xl border border-orange-500/20 bg-orange-500/5 px-4 py-3.5" : ""}`}
            >
              {selectedAction.action === "admin" && (
                <div className="">
                  <p className="font-medium text-orange-600 dark:text-orange-400">
                    Administrator access
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Administrators can manage users, courses, tests, and other
                    administrative resources.{" "}
                    <span className="text-teal-400/60 font-semibold">
                      Only give this role to trusted users.
                    </span>
                  </p>
                </div>
              )}

              {selectedAction.action === "tutor" && (
                <>
                  <p className="font-medium">Tutor access</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tutors can access tutor-specific features and manage their
                    created courses and learning content.
                  </p>
                </>
              )}

              {selectedAction.action === "user" && (
                <>
                  <p className="font-medium">Regular user access</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This will remove elevated tutor or administrator access and
                    return the account to a regular user role.
                  </p>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setSelectedAction(null)}
                className="rounded-lg border px-4 py-2 text-xs"
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  // API will be connected later
                }}
                className={`rounded-lg px-4 py-2 text-xs text-primary-foreground ${
                  selectedAction.action === "admin"
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-primary"
                }`}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
