+function ($) {

    "use strict";

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame 
    	|| function(callback){ window.setTimeout(callback, 1000 / 60);};     

    var Layout = function (element, options) {
        var self  = this;
        this.$el  = $(element);
        this.opts = $.extend({}, Layout.DEFAULTS, options);
        this.elementWidth = this.$el.width();        

        $(window).resize(function (){
            this.resizeTo && clearTimeout(this.resizeWatcher);
            this.resizeWatcher = setTimeout(function() {
                $(this).trigger('v.resize');
            }, 400);
        });

        $(window).on('v.resize', function () {
            var currentWidth = self.$el.width();
            if (self.elementWidth !== currentWidth) {
                self.elementWidth = currentWidth;
                requestAnimationFrame(function () {
                	self.render();
                });
            }
        });
    }

    Layout.DEFAULTS = {
        margin: 12,  //pixels
        blockEl: 'i',
        patterns: ['##--##oo'],
        specialPatterns: []        
    }

    Layout.prototype.setBlockWidth = function (size) {
        this.blockWidth = size ? size : (this.$el.innerWidth() - 4 * this.opts.margin) / 4;      
        return this;
    }

    Layout.prototype.setBlocks = function () {
        this.blocks = this.$el.find(this.opts.blockEl).get().reverse();
        return this;
    }

    Layout.prototype.renderBlock = function (x, y, width, height) {
        var margin = this.opts.margin,
            size   = this.blockWidth,
            block  = this.blocks.pop();

        if(block !== undefined) {            
            $(block).css({
                'margin-left': x * size + (x + 1) * margin,
                'margin-top': y * size + (y + 1) * margin,
                'width': width * size + (width - 1) * margin,
                'height': Math.ceil(height * size + (height - 1) * margin),
                'display': 'inline'
            });
        }
        return this;
    }

    Layout.prototype.renderCanvas = function (height, pattern) {

        for (var i = 0, ll = pattern.length; i < ll; i++) {

            var x = i % 4,
                y = height + Math.floor(i / 4);

            if (pattern[i] === 'o') {
                this.renderBlock(x, y, 1, 1);

            } else if (pattern[i] === '#') {
                this.renderBlock(x, y, 2, 2);
                pattern[i] = pattern[i + 1] = pattern[i + 4] = pattern[i + 5] = 'x';

            } else if (pattern[i] === '|') {
                this.renderBlock(x, y, 1, 2);
                pattern[i] = pattern[i + 4] = 'x';

            } else if (pattern[i] === '-') {
                this.renderBlock(x, y, 2, 1);
                pattern[i] = pattern[i + 1] = 'x';
            }
        }
        return this;
    }

    Layout.prototype.render = function () {

        this.setBlocks().setBlockWidth();

        var h = 0,
            i = 0,
            maxHeight = 0;

        while (this.blocks.length) {

            var nBlocks = this.blocks.length,
                pattern = '';

            if (nBlocks === 1) {
                this.$el.append(this.opts.blockFillEl);
                this.blocks.push(this.opts.blockFillEl);
                
                this.blocks[1] = this.blocks[0];
                this.blocks[0] = this.opts.blockFillEl;
            }
            
            if (nBlocks < 6 && this.opts.specialPatterns[nBlocks-1]) {
                pattern = this.opts.specialPatterns[nBlocks-1];
            } else {
                pattern = this.opts.patterns[i];
            }     

            this.renderCanvas(h, pattern.split(''));
            
            i = (i + 2) === (this.opts.patterns.length) ? 0 : (i + 1);
            h += 2;
        }

        /* fix the height */
        this.$el.find(this.opts.blockEl).each(function () {
            var $this = $(this),
                height = $this.offset().top + $this.outerHeight(false);

            if (height > maxHeight) {
                maxHeight = height;
            }
        });
                
        this.$el.height(maxHeight - $('header').outerHeight(true));
    }

    // MODAL PLUGIN DEFINITION
    // =======================

    $.fn.layout = function (option) {
        return this.each(function () {

            var $this   = $(this),
                data    = $this.data('layout'),
                options = $.extend({}, Layout.DEFAULTS, $this.data(), typeof option == 'object' && option)

            !data && $this.data('layout', (data = new Layout(this, options)));            

            requestAnimationFrame(function () {
            	$this.data('layout').render();
            });

        });
    }
    $.fn.layout.Constructor = Layout;
}(window.jQuery);
