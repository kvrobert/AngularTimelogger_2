export class WorkMonth {

   // id: number;
   year?: number;
   month?: number;


   public getYear(): number {
     return this.year;
   }

   public getMonth(): number {
     return this.month;
   }

   public setYear( year: number ): void {
     this.year = year;
   }

  public setMonth( month: number ): void {
    this.year = month;
  }
}
