<template>
    <i class="icon-menu"><i></i><i></i><i></i></i>
</template>
<style lang="scss" scoped>
    .icon-menu{
        display: block;
        width: 1em;
        height: 1em;
        position: relative;
        z-index: 1;
        overflow: hidden;
        >i{
            display: block;
            width: .5em;
            height: 0.05em;
            background: currentColor;
            border-radius: 0.0425em;
            position: absolute;
            z-index: 2;
            left:.25em;
            opacity: 1;
            transition: all 300ms;
            &:nth-child(1){
                top:.325em;
                transform: translateY(0) rotate(0);
            }
            &:nth-child(2){
                top:.475em;
            }
            &:nth-child(3){
                bottom:.325em;
                transform:translateY(0) rotate(0) ;
            }
        }
        &.close{
            >i{
                &:nth-child(1){
                    transform: translateY(.15em) rotate(45deg);
                }
                &:nth-child(2){
                    //opacity: 0;
                    transform: rotate(-180deg) scaleX(0);
                }
                &:nth-child(3){
                    transform: translateY(-.15em) rotate(135deg) ;
                }
            }
        }
    }
</style>
