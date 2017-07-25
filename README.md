# ngx-heyl-progressbar

This package allows you to use a progressbar element in AngularX (2+) projects.

## Installation

1. Install npm module : 

   `npm install ngx-heyl-progressbar`

2. Import the module :

   Open your `app.module.ts` file and import the module like this :
   
   ```typescript
   import { SnackbarModule } from "ngx-heyl-snackbar";
   @NgModule({
      imports: [ 
         ...,
         ProgressbarModule
      ]
   })
   ```
 
3. Then use `<progressbar>` component :

   ```html
   <progressbar [value]="'20'" class="stripped"></progressbar>
   <progressbar [value]="'20'" [max]="'50'" [progressType]="'percent'"></progressbar>
   <progressbar [value]="'60'" [max]="'80'" [progressType]="'value'"></progressbar>
   ```
      
4. Styling progressbar component

   You can declare the style you want for the progressbar. Here is an example :
   
   ```scss
    progressbar {
       /* background element */
       background-color: rgba(0, 0, 0, 0.4);   
    
       > .progress {
           /* Progress bar */
           background-color: #005590;
           color: #fff;
       }
    }
   ```