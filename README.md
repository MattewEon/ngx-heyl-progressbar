# ngx-heyl-progressbar

This package allows you to use a progressbar element in AngularX (2+) projects.
#### Please don't hesitate to ask for new features or report a bug on Github! Thanks

## Small wiki

Inputs available :

| Inputs | Default value | Description |
| -------| --------------| ----------- |
| `value` | `0` | Value of the progressbar |
| `max` | `100` | Max value of the progressbar |
| `step` | `100` | How many ticks should be displayed when the progressbar has the class ".stepped" |
| `progressType` | `"none"` | Define the text displayed inside the progressbar. Can be `"none"`, `"percent"` (3%), `"value"` (3) or `"ng-content"` |
| `setConfig` | `new ProgressbarConfig()` | Set multiple properties in one property |
| `color1` | `101` | Rate after which the class `.color1` will be set to the progressbar |
| `color2` | `101` | Rate after which the class `.color2` will be set to the progressbar |
| `color3` | `101` | Rate after which the class `.color3` will be set to the progressbar |

CSS classes :

| Class | Description |
| -------| ----------- |
| `stepped` | Prints a tick every step |
| `stripped` | Add an animated background on the .progress element |
| `stripped-reverse` | Add an animated background on the .progress element moving on the other side |

## Installation

1. Install npm module : 

   `npm install ngx-heyl-progressbar`

2. Import the module :

   Open your `app.module.ts` file and import the module like this :
   
   ```typescript
   import { ProgressbarModule } from "ngx-heyl-progressbar";
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
   <progressbar [value]="'20'" [max]="'50'" [step]="'4'" [progressType]="'percent'" class="stepped stripped-reverse"></progressbar>
   <progressbar [value]="'60'" [max]="'80'" [progressType]="'value'"></progressbar>
   ```
      
4. Styling progressbar component

   You can declare the style you want for the progressbar. Here is an example :
   
   ```scss
    progressbar {
       /* background element */
       background-color: rgba(0, 0, 0, 0.4);   
    
       &.default > .progress {
           /* Progress bar when the progress class is default */
           background-color: green;
           color: #fff;
       }
    
       &.color1 > .progress {
           /* Progress bar when the progress class is color1 */
           background-color: orange;
           color: #fff;
       }
    }
 
   ```
