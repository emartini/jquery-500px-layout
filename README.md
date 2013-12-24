jquery-500px-layout
===================

Jquery implementation of the old 500px layout:

Credits and detailed explanation:
http://blog.vjeux.com/2012/image/image-layout-algorithm-500px.html

##Usage

```  
  $(function () {
    $("#layout").layout({
        patterns: ['o|--o|oo','|--o|o--','--o|ooo|','oo|o--|o'],
        specialPatterns: ['----','----','--oo','oooo','|--o|o--','o|--o|oo'],
        blockFillEl: $('<i class="fill"></i>')
    });
  })
```
###Options

*patterns*: an array of string with the patterns to be repeatedly used. All available combinations are here http://jsfiddle.net/vjeux/L2NQ6 (credits to blog.vjeux.com). By default ['##--##oo']

*specialPatterns*: are used on the ending conditions, each element from the array is used when remain 1,2,3,4 or 6 elements. By default []

*blockEl*: The element to be transformed. By default 'i',

*blockFillEl*: a fill element used when in the last row there is only one element

