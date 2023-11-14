import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
    
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  categories : Array<string> | undefined;
  categoriesSubscriptions : Subscription | undefined;
  constructor(private storeServices: StoreService) { }

  ngOnInit(): void {
    this.storeServices.getAllCategories()
    .subscribe((response)=> {
      this.categories = response;
    });
  }
  onShowCategory(category: string) :void{
    this.showCategory.emit(category); 
  }
  ngOnDestroy(): void{
    if(this.categoriesSubscriptions){
      this.categoriesSubscriptions.unsubscribe();
    }
  }

}
