import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  private isLoading: boolean = false;

  constructor() { }

  loadingStart(): void {
    this.isLoading = true;
  }

  loadingEnd(): void{
    this.isLoading = false;
  }
  isLoadingStatus(): boolean {
    return this.isLoading;
  }

}
