export interface Session {
  startSessionTime: bigint;
  endSessionTime: bigint;
  attendedCount: bigint;
}

export interface Event {
  organizer: `0x${string}`;
  priceAmount: bigint;
  commitmentAmount: bigint;
  totalSession: number;
  startSaleDate: bigint;
  endSaleDate: bigint;
  lastSessionEndTime: bigint;
  enrolledCount: bigint;
}

export interface Participant {
  enrolledDate: bigint;
  commitmentFee: bigint;
  attendedSessionsCount: number;
}

export interface UnattendedFeesPreview {
  unattendedCount: bigint;
  totalUnattendedCommitmentFees: bigint;
  organizerShare: bigint;
  protocolShare: bigint;
}

export interface CreateEventParams {
  title: string;
  description: string;
  location: string;
  imageUri: string;
  priceAmount: bigint;
  commitmentAmount: bigint;
  maxParticipant: number;
  startSaleDate: bigint;
  endSaleDate: bigint;
  tags: [string, string, string, string, string];
  sessions: Session[];
}

export interface CreateEventMetadataParams {
  eventId: bigint;
  title: string;
  description: string;
  location: string;
  imageUri: string;
  tags: [string, string, string, string, string];
}

export interface CreateSessionParams {
  eventId: bigint;
  sessionIndex: number;
  title: string;
  startSessionTime: bigint;
  endSessionTime: bigint;
}

export interface SetSessionCodeParams {
  eventId: bigint;
  sessionIndex: number;
  code: string;
}

export interface AttendSessionParams {
  eventId: bigint;
  sessionIndex: number;
  sessionCode: string;
}

export interface ClaimUnattendedFeesParams {
  eventId: bigint;
  sessionIndex: number;
}

export interface EnrollEventParams {
  eventId: bigint;
}

export interface ClaimFirstPortionParams {
  eventId: bigint;
}

export interface GetOrganizerAmountsParams {
  eventId: bigint;
  organizer: `0x${string}`;
}

export interface GetParticipantAttendanceParams {
  eventId: bigint;
  participant: `0x${string}`;
  sessionIndex: number;
}

export interface GetParticipantDataParams {
  eventId: bigint;
  participant: `0x${string}`;
}

export interface GetSessionDataParams {
  eventId: bigint;
  sessionIndex: number;
}

export interface PreviewUnattendedFeesParams {
  eventId: bigint;
  sessionIndex: number;
}

// Contract Events
export interface CreateEventEvent {
  eventId: bigint;
  organizer: `0x${string}`;
  priceAmount: bigint;
  commitmentAmount: bigint;
  totalSession: number;
  maxParticipant: number;
  startSaleDate: bigint;
  endSaleDate: bigint;
}

export interface CreateEventMetadataEvent {
  eventId: bigint;
  title: string;
  description: string;
  location: string;
  imageUri: string;
  tags: [string, string, string, string, string];
}

export interface CreateSessionEvent {
  eventId: bigint;
  session: number;
  title: string;
  startSessionTime: bigint;
  endSessionTime: bigint;
}

export interface EnrollEventEvent {
  eventId: bigint;
  participant: `0x${string}`;
  debitAmount: bigint;
}

export interface AttendEventSessionEvent {
  eventId: bigint;
  session: number;
  participant: `0x${string}`;
  attendToken: `0x${string}`;
}

export interface GenerateSessionTokenEvent {
  eventId: bigint;
  session: number;
  token: string;
}

export interface SetSessionCodeEvent {
  eventId: bigint;
  session: number;
  organizer: `0x${string}`;
  releasedAmount: bigint;
}

export interface OrganizerFirstClaimEvent {
  eventId: bigint;
  organizer: `0x${string}`;
  claimAmount: bigint;
}

export interface OrganizerLastClaimEvent {
  eventId: bigint;
  organizer: `0x${string}`;
  claimAmount: bigint;
}

export interface OrganizerClaimUnattendedEvent {
  eventId: bigint;
  session: number;
  unattendedPerson: number;
  organizer: `0x${string}`;
  claimAmount: bigint;
}
