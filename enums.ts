export enum CourseStatus {
  ALL = "all",
  PENDING_REVIEW = "pending_review",
  APPROVED = "published",
  REJECTED = "rejected",
}

export enum CourseCategory {
  ALL = "allLevels",
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

export enum CourseAction {
  MARK_PENDING = "mark_pending",
  PUBLISH = "publish",
  REJECT = "reject",
  NULL = "",
}

export enum EUserRole {
  STUDENT = "user",
  TUTOR = "tutor",
  ADMIN = "admin",
}

export enum UserStatus {
  INPROGRESS = "in_progress",
  CERTIFIED = "certified",
  ALL = "all",
}

export enum FilterBarStatusEnum {
  USER = "user",
  COURSE = "course",
}

export enum FilterBarType {
  USER = "user",
  COURSE = "course",
  ASSIGNMENT = "assignment",
  LIVE_CLASS = "live_class",
  LESSONS = "LESSON",
}
