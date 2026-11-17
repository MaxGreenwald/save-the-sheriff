# Save the Sheriff: original game spec (from YouTube playthrough eyhBOkXMBlY, 27:39)

## Core
- 2D side-scrolling platformer. Player is a PIG rescuing a kidnapped sheriff. Reach the level exit (sign with swirl symbol, door, or walking off right edge).
- Originally a J2ME mobile game. Controls: Left/Right move, Up jump (orig keys 4/6/2; 1/3/5 for diagonal/forward jumps). Modern: arrows/WASD + space, plus touch buttons.
- HUD across top over the sky: top-left 5 pig heads (lives) + 5 red hearts (health); top-left-center blue/white swirl coin icon + count; top-right-center 6-digit score (000000); top-right stopwatch timer starting at 300, -1 per second, remaining time becomes bonus. Bottom-right small translucent pause button.
- Damage: touching enemies from side/below or spikes = lose a heart. Pits/water = instant life loss.
- Combat: stomp enemies on the head. 100 pts per enemy, chained stomps without touching ground = 200 etc. Swirl tokens 100 pts. Floating "100"/"200" text on earn. "GREAT!" popups for solving puzzles/entering doors.

## Screens
- Title: "SAVE THE SHERIFF" chunky wood-textured orange pixel letters, light blue sky, wooden western building edge on left, green cactus on right. Pill buttons with blue gradient + dark outline (thick orange outline on hover): CONTINUE, NEW GAME, SETTINGS, HIGH SCORES, HELP, ABOUT (skip PLAYDO/EXIT or adapt).
- Settings: MUSIC ON/OFF, (VIBRA), LANGUAGES, RESET SCORES.
- Help: story + controls text over menu background.
- New game confirm: "ARE YOU SURE YOU WANT TO START A NEW GAME?" green check bottom-left, red X bottom-right.
- Loading: pig running animation above blue pill progress bar labeled LOADING.
- Level start: light blue screen, black pixel text "PRESS ANY KEY"; then "LEVEL X" floats up from center.
- Level done: white projector/whiteboard pops up from bottom: "LEVEL DONE!" + "BONUS: [n]".
- Game completed: wooden room, "GAME COMPLETED! THANK YOU FOR SAVING THE SHERIFF", then "ENTER NICK:" text box, then high score table.

## Levels
1. Desert canyon (light blue sky, tan terrain, cacti). Frogs (stationary, flip direction), snakes (patrol platforms). Introduces swirl tokens, moving wooden plank on blue wheels over a pit, pushable grey boulder that rolls off a ledge and smashes a wooden crate below. Exit: walk past wooden building off right edge.
2. Western town (tall wood/brick buildings, porches). Frogs, green birds (fly horizontally back and forth). Climbing poles/ladders. Hostages: bandit holding a cage with the sheriff, stomp bandit to free him (sheriff drops with heart above head), happens twice. Red plunger box with yellow star detonates a boulder wall blocking the exit.
3. Desert canyon. Frogs, snakes, NEW gun bandit: paces a ledge, periodically fires a horizontal projectile. Exit: blue signpost with white swirl.
4. Desert canyon with rope bridges. Snakes, frogs. TNT crates (can't break directly, plunger detonates them). Boulder stacking puzzle: push a stack of boulders off a ledge one by one, they stack at the bottom into a staircase to climb a high cliff. Swirl signpost exit.
5. Desert canyon. Frogs, NEW net bandit (swings net if approached from front, must be stomped). Spring pad (metal coil, high launch). Breakable beige patterned stone blocks (crumble when jumped on). Deep blue water (kills). Rolling boulder ride: stand on giant boulder in water trench and run to roll it across. Swirl signpost.
6. Western town. Birds, frogs, net bandits, snakes. High-wire platforming on telephone poles and power lines over rooftops. Plunger clears boulder wall, walk offscreen.
7. Rainy caves (white rain streaks, green grass, grey rock). Frogs, NEW blue flying bug (hovers, swoops down in V when pig approaches). Gold key + blue keyhole door that teleports to a new section. Ends at final blue door with "GREAT!".
8. Rainy caves. Frogs, snakes, bugs. Giant grey rock pillars moving vertically and horizontally. Metal spikes on ground (damage). Swirl signpost.
9. Water level: water across bottom, small grassy islands. Frogs, snakes, bugs, net bandit, NEW blue fish that leap straight up out of water and fall back. Exit: dark cave doorway.
10. Cave gauntlet: many key/door teleports into isolated puzzle rooms, big boulder-stacking staircases, TNT/plunger routing. Snakes, frogs, bugs. Walk out the cave exit.
11. Sunset canyon (orange sky, yellow terrain). Frogs, snakes, gun bandit. BOSS: sheriff tied to the toe of a giant flying steam-powered wooden mechanical boot piloted by a bandit. Boot hovers and tracks pig horizontally, pauses, shakes, slams straight down. On landing the pilot's head pops out of top hatch: stomp it. Machine flashes white and rises. 4 hits: it explodes, sheriff freed. Walk off screen to game-complete sequence.

## Art and audio
- Bright saturated 16-bit pixel art, heavy black outlines. Cute pig, humans with oversized heads.
- Pig 4-frame run cycle, splayed-leg jump sprite. Frogs puff throats, snakes 2-frame slither, birds flap. Boss has moving gears and grey exhaust puffs. TNT: multi-frame yellow/orange/red pixel explosion.
- Audio (inferred): upbeat western chiptune loops per biome (desert, town, cave, boss); SFX for menu click, jump, token/key chime, stomp bop, hurt grunt, explosions, victory jingle.
- No tutorial popups: mechanics taught through level design.
