import InboxIcon from "@mui/icons-material/MoveToInbox"
import HomeIcon from "@mui/icons-material/Home"
import TopicIcon from '@mui/icons-material/Topic';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import GroupsIcon from '@mui/icons-material/Groups';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import SendIcon from '@mui/icons-material/Send';
import { SxProps, Theme } from "@mui/material"

type FontSize = "small" | "medium" | "large" | "inherit"
type Color =
  | "inherit"
  | "action"
  | "disabled"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"

type Props = {
  key: string
  fontSize?: FontSize
  color?: Color
  sx?: SxProps<Theme>
}
export function getSidebarIcon({ key, ...props }: Props) {
  switch (key) {
    case "home":
      return <HomeIcon {...props} />
    case "departments":
      return <GroupsIcon {...props} />
    case "employees":
      return <PeopleAltIcon {...props} />
    case "work-logs":
      return <WorkHistoryIcon {...props} />
    case "schedule":
      return <CalendarMonthIcon {...props} />
    case "leaves":
      return <WorkOffIcon {...props} />
    case "documents":
      return <TopicIcon {...props} />
    case "feedback":
      return <SendIcon {...props} />
    default:
      return <InboxIcon {...props} />
  }
}
