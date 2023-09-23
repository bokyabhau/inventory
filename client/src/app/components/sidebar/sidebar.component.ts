import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  items: NbMenuItem[] = [
    {
      title: 'Data Entry',
      icon: 'download-outline',
      link: '/entry',
    },
    {
      title: 'Parts',
      icon: 'settings-outline',
      link: '/parts',
    },
    {
      title: 'Rejections',
      icon: 'close',
      link: '/rejections',
    },
    {
      title: 'Reports',
      icon: 'activity',
      link: '/reports',
    },
  ];
}
