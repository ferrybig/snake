# Snake

This project is a demonstration of a snake game + ai made in javascript.

## Build proccess

This project uses [Grunt](https://gruntjs.com/getting-started#working-with-an-existing-grunt-project) as its task runner, 
and the code has been setup modulairy to provide good build support

 * Build and runs the project
   ```shell
   grunt
   ```
  
 * Builds the project
   ```shell
   grunt build
   ```
   
## AI

The AI is made using a few basic rules:

* On an even x cordinate, it may NOT move down (low priority)
* On an odd x cordinate, it may NOT move up (low priority)
* On an even y cordinate, it may NOT move left (low priority)
* On an odd y cordinate, it may NOT move right (low priority)
* The AI should avoid going thru walls (medium priority)
* After committing a move, it may not intersect with itself (high priority)

The rules are resolved when trying to move, and usualy, no rules will be broken during the move progress.

After these steps are run, the ai will evaluate the strategic position of the move by using the 
[euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) function from the new position archieved, 
and move to that direction.

The basic steps prevent the ai from ever getting into a situation where it will kill itself
(the first options basicly make it move in a grid like fasion)

The grid created by these operations look like:

    ↗️↘️↗️↘️↗️↘️↗️↘️
    ↖️↙️↖️↙️↖️↙️↖️↙️
    ↗️↘️↗️↘️↗️↘️↗️↘️
    ↖️↙️↖️↙️↖️↙️↖️↙️
    ↗️↘️↗️↘️↗️↘️↗️↘️
    ↖️↙️↖️↙️↖️↙️↖️↙️
    ↗️↘️↗️↘️↗️↘️↗️↘️
    ↖️↙️↖️↙️↖️↙️↖️↙️ 
    
To prevent the ai from making circles around the food in case the food in near a wall, the position of the food will be
shifted a little off center, and is clipped at the sides of the playing field, this makes sure the food can always be picked up.
