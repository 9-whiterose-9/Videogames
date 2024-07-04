import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item | undefined;

  constructor(private route: ActivatedRoute, 
              private itemService: ItemService, 
              private location: Location) { }


  ngOnInit(): void {
    this.getItemDetail();
  }

  getItemDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("id_item: "+id)
    if (id) {
      console.log("ASKING FOR ITEM DETAIL IN TS")
      this.itemService.getItemDetail(id)
        .subscribe(item => this.item = item);
    }
  }

  openVideoLink(): void {
    if (this.item && this.item.videoLink) {
      window.open(this.item.videoLink, '_blank');
    }
  }
  
  goBack() : void{
    this.location.back();
  }
}


