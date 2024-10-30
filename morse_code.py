import asyncio
from pywizlight import wizlight, PilotBuilder
import random
import string

# Base timing unit in seconds
BASE_UNIT = 0.3

# Morse code dictionary
MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', ' ': ' ',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----'
}
ORANGE_COLOR = (235, 97, 35)

async def _turn_on_lights(lights):
    await asyncio.gather(*(light.turn_on(PilotBuilder(rgb=ORANGE_COLOR)) for light in lights))

async def _turn_off_lights(lights):
    await asyncio.gather(*(light.turn_off() for light in lights))

async def flash_dot(lights):
    await _turn_on_lights(lights)
    await asyncio.sleep(BASE_UNIT)  # Short flash for dot (1 unit)
    await _turn_off_lights(lights)
    await asyncio.sleep(BASE_UNIT)  # Gap between signals (1 unit)

async def flash_dash(lights):
    await _turn_on_lights(lights)
    await asyncio.sleep(BASE_UNIT * 3)  # Longer flash for dash (3 units)
    await _turn_off_lights(lights)
    await asyncio.sleep(BASE_UNIT)  # Gap between signals (1 unit)

async def flash_morse_character(lights, morse_char):
    for symbol in morse_char:
        if symbol == '.':
            await flash_dot(lights)
        elif symbol == '-':
            await flash_dash(lights)
        # else symbol is space, handled in main loop
    await asyncio.sleep(BASE_UNIT * 10)  # Gap between letters (3 units)

async def main():
    light = wizlight("192.168.4.200")
    light2 = wizlight("192.168.4.201")
    # message = "CATS CRADLE 13"  # Example message with space

    # make the message a random 10-character string
    message = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    
    while True:
        for char in message.upper():
            if char == ' ':
                await asyncio.sleep(BASE_UNIT * 5)  # 7 units total for word space
                continue
            print(f"Flashing character: {char} ({MORSE_CODE[char]})")
            if char in MORSE_CODE:
                await flash_morse_character([light, light2], MORSE_CODE[char])
        await asyncio.sleep(BASE_UNIT * 10)  # Pause between message repetitions (10 units)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nScript terminated by user")
    except Exception as e:
        print(f"Error running script: {e}")