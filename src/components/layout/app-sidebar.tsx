// import { NavGroup } from '@/components/layout/nav-group'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))} */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={sidebarData.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
