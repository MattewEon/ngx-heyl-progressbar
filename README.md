# ngx-heyl-progressbar

This package allows you to use a progressbar element in AngularX (2+) projects.
#### Please don't hesitate to ask for new features or report a bug on Github! Thanks

## Small wiki

Inputs available for `progress-container`:

| Inputs | Default value | Description |
| -------| --------------| ----------- |
| `step` | `100` | How many ticks should be displayed when the progressbar has the class ".stepped". Step value will be *2 until it's > 3% |
| `force-step` | `step` | How many ticks should be displayed when the progressbar has the class ".stepped". |

Inputs available for `progressbar`:

| Inputs | Default value | Description |
| -------| --------------| ----------- |
| `value` | `0` | Value of the progressbar |
| `max` | `100` | Max value of the progressbar |
| `progressType` | `"none"` | Define the text displayed inside the progressbar. Can be `"none"`, `"percent"` (3%), `"value"` (3) or `"ng-content"` |
| `Config` | `new ProgressbarConfig()` | Set multiple properties in one property |
| `color1` | `101` | Rate after which the class `.color1` will be set to the progressbar |
| `color2` | `101` | Rate after which the class `.color2` will be set to the progressbar |
| `color3` | `101` | Rate after which the class `.color3` will be set to the progressbar |

CSS classes for `progress-container`:

| Class | Description |
| -------| ----------- |
| `.stepped` | Prints a tick every step |

CSS classes  for `progressbar`:

| Class | Description |
| -------| ----------- |
| `.stripped` | Add an animated background on the .progress element |
| `.no-animate` | Keep the background from `.stripped` or `.stripped-reverse`, without any move |
| `.stripped-reverse` | Add an animated background on the .progress element moving on the other side |

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
   <progress-container>
       <progressbar [value]="'20'" [max]="'40'" class="stripped"></progressbar>
   </progress-container>
   <progress-container class="stepped" [step]="'10'">
       <progressbar [value]="'20'" class="stripped"></progressbar>
       <progressbar [value]="'50'" class="class=stripped-reverse""></progressbar>
   </progress-container>
   ```
      
4. Styling progressbar component

   You can declare the style you want for the progressbar. Here is an example :
   
   ```scss
    progress-container {
       /* background element */
       background-color: rgba(0, 0, 0, 0.4);   
    
       > .progressbar {
          color: #fff;
          
          &.default {
             /* Progress bar when the progress class is default */
             background-color: green;
          }

          &.color1 {
             /* Progress bar when the progress class is color1 */
             background-color: orange;
          }    
    
          ...
       }
    }
 
   ```