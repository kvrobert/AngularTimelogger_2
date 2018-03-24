import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  private isLoading: boolean = false;

  constructor() { }

  loadingStart(): void {
    console.log("STRAT Loading..service");
    this.isLoading = true;
  }

  loadingStop(): void {
    console.log("STOP Loading..service");
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }
  isLoadingStatus(): boolean {
    return this.isLoading;
  }

}
