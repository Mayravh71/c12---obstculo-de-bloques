function construir_obstaculo () {
    for (let value of Blocks) {
        blocks.place(value, loc)
        blocks.place(BEACON, positions.add(
        loc,
        pos(0, 0, -2)
        ))
        blocks.place(BEACON, positions.add(
        loc,
        pos(0, 0, 2)
        ))
        block_loc.push(loc)
        loc = positions.add(
        loc,
        pos(5, 0, 0)
        )
    }
    blocks.place(ENCHANTMENT_TABLE, positions.add(
    loc,
    pos(1, 0, 0)
    ))
    loops.pause(100)
    count = 0
    time = 30
}
player.onChat("obstaculo", function () {
    start_position = player.position()
    loc = positions.add(
    player.position(),
    pos(1, 0, 0)
    )
    construir_obstaculo()
})
player.onTravelled(WALK, function () {
    for (let value of block_loc) {
        if (true && (player.position().getValue(Axis.X) == value.getValue(Axis.X) && player.position().getValue(Axis.Z) == value.getValue(Axis.Z))) {
            count = count + 1
            player.say(count)
        }
    }
    if (blocks.testForBlock(ENCHANTMENT_TABLE, player.position()) && count >= 7) {
        remover_bloques()
        player.say("¡Felicidades! ¡Cruzaste los obstáculos!")
        player.execute(
        "/scoreboard players set @a count 0"
        )
        player.execute(
        "/scoreboard players set @s count 1"
        )
    } else {
        if (time < 0 && count < 7) {
            remover_bloques()
            player.say("¡No cruzaste los obstáculos!")
            player.execute(
            "/scoreboard players set @a count 1"
            )
            player.execute(
            "/scoreboard players set @s count 0"
            )
        }
    }
})
loops.forever(function () {
    for (let index = 0; index < 31; index++) {
        loops.pause(1000)
        if (time > 0) {
            time += -1
            player.say("Tiempo restante " + time + " segundos")
            if (time == 0) {
                player.teleport(start_position)
                time = -1
            }
        }
    }
})
function remover_bloques () {
    blocks.place(AIR, positions.add(
    loc,
    pos(1, 0, 0)
    ))
    for (let value of block_loc) {
        blocks.place(AIR, value)
        blocks.place(GOLD_BLOCK, positions.add(
        value,
        pos(0, 1, 0)
        ))
    }
}
let start_position: Position = null
let time = 0
let count = 0
let loc: Position = null
let block_loc: Position[] = []
let Blocks: number[] = []
gameplay.setGameMode(
CREATIVE,
mobs.target(ALL_PLAYERS)
)
mobs.teleportToPlayer(
mobs.target(ALL_PLAYERS),
mobs.target(LOCAL_PLAYER)
)
Blocks = [
PLANKS_OAK,
PLANKS_DARK_OAK,
POLISHED_ANDESITE,
NOTE_BLOCK,
GRANITE,
LAPIS_LAZULI_BLOCK,
PLANKS_SPRUCE
]
block_loc = []
player.execute(
"/scoreboard objectives add count dummy count"
)
player.execute(
"/scoreboard players set @a count 0"
)
player.execute(
"/scoreboard objectives setdisplay sidebar count "
)
