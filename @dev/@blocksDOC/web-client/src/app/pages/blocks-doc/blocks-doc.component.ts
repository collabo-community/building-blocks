import { Component, OnInit } from '@angular/core';
import { AppInfoService } from '../../services/app-info.service';

@Component({
  selector: 'app-blocks-doc',
  standalone: true,
  imports: [],
  templateUrl: './blocks-doc.component.html',
  styleUrl: './blocks-doc.component.scss'
})
export default class BlocksDocComponent implements OnInit{
  public appInfo: any = {};

  constructor(private appInfoService: AppInfoService) {}

  ngOnInit() {
    this.test();
  }

  test() {
    this.appInfoService.getAppInfo().subscribe((response: any) => {
      // console.log({ response });
      this.appInfo = response;
    });
  }

}
