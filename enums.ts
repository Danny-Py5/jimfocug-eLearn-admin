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
