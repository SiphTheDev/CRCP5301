### Spontaneous Ideas for 

1. Have one tower that's actually frequency driven, as a sort of "chaos wizard," given my lack of luck in finding noticable correlations between frequency and actual music.

2. Progression: unlock paths up the tower to be able to place units further up the tower.
	- some amount of the currency for bonus side areas
	- number of kills for main path
	- mini-boss (a tough wave or single new enemy type) at the top of the level that must be defeated to advance to next screen. 

3. If have extra time, look into storing progress between people's visits to the site.
		- Can it 1 create a json (or xml, etc) file for each indiv visitor
		- Can it 2 Retrieve some unique identifier from the visitor (ip?)
		- Can it 3 Compare a new visitor's identifier to all past ones to see if they're a repeat?
			- Perhaps Store just a list of past visitors in one json (etc) and then search that. If there's a match, can plug that name into the title of the proper json, and then read that.

4. Title Ideas:
	- Faces to the Sky
	- Rise (too vague, I fear)

5. Use tile map for pathing:

	- You'll already have an array of all the tiles on the screen [or at least, can convert it to a 2D array easily], and the type of tile determines where enemies can go (ie only on foePaths, which could be tiles # 004,006,007,024, etc). Then pathing alg should be able to more easily follow those. Or if hard code, can just have them jump from one tile to next, listing the tile numbers. The point is, the world's already a grid, so you might as well use it. 