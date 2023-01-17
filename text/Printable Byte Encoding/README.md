# PBE

is a custom text encoding based on ASCII and some Unicode chars.

The purpose of this charset is to get rid of the useless control characters and allow every byte value to be visible without hexadecimal.

The main downside is that it's a fixed-width octet encoding, which means there are only 256 possible chars available.
At least it's better than ASCII's 96 printables, with a total of 128.

If you want to make a text editor that supports this encoding, you are encouraged to do so!
But keep in mind this charset is "unstable", in the sense that it's subject to breaking changes.

## Table

"0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ\f\n\r\t .,:;!¡?¿\"'`@#%&()[]\{}*^+-±<=>$£¥¢/|\\_~¤¦§¨©®ª«»¬­¯°º¹²³´µ¶·¸¼½¾"

Should this support Vertical Tab? "\v"
