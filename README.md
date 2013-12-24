jquery-500px-layout
===================

Jquery implementation of the old 500px layout:

Credits and detailed explanation:
http://blog.vjeux.com/2012/image/image-layout-algorithm-500px.html

##Usage

```  
  $(function () {
    $j("#layout").layout({
        patterns: ['o|--o|oo','|--o|o--','--o|ooo|','oo|o--|o'],
        specialPatterns: ['----','----','--oo','oooo','|--o|o--','o|--o|oo'],
        blockFillEl: $j('<i class="fill"></i>')
    });
  })
```
