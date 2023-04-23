<!-- CREATE by WangXinzhao at 2022/7/14 11:29 -->
<template>
    <i class="ax-icon"></i>
</template>
<style lang="scss" scoped>
$icon-true : url("@/assets/images/icon-true.svg");
$icon-play : url("@/assets/images/icon-play.svg");
$icon-price : url("@/assets/images/icon-price.svg");
$icon-camera : url("@/assets/images/icon-camera.svg");
$icon-arrow-circle : url("@/assets/images/icon-arrow-down.svg");
$icon-arrow : url("@/assets/images/icon-arrow-noborder-right.svg");
$icon-arrow-down : url("@/assets/images/icon-arrow-noborder-down.svg");
$icon-message : url("@/assets/images/icon-message.svg");
$icon-message-2 : url("@/assets/images/icon-message-2.svg");
$icon-clap : url("@/assets/images/icon-clap.svg");
$icon-clap-active : url("@/assets/images/icon-clap-active.svg");
$icon-heart : url("@/assets/images/icon-heartb.svg");
$icon-user-true : url("@/assets/images/icon-user-true.svg");
$icon-verify : url("@/assets/images/icon-verify.svg");
$icon-plus : url("@/assets/images/icon-plus.svg");
$icon-edit : url("@/assets/images/icon-edit.svg");
$icon-times : url("@/assets/images/icon-times.svg");
$icon-true-fill-circle : url("@/assets/images/icon-true-fill-circle.svg");
$icon-copy : url("@/assets/images/icon-copy.svg");
$icon-close : url("@/assets/images/icon-close.svg");
.ax-icon{
    margin: 0;
    padding:0;
    display: block;
    flex-grow: 0;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    background: currentColor;
    mask:no-repeat center center;
    mask-size: auto 100%;
    -webkit-mask:no-repeat center center;
    -webkit-mask-size: auto 100%;
    &.icon-true{
        mask-image:$icon-true;
        -webkit-mask-image:$icon-true;
    }
    &.icon-play{
        mask-image:$icon-play;
        -webkit-mask-image:$icon-play;
        mask-size: auto 45%;
        -webkit-mask-size: auto 45%;
    }
    &.icon-price{
        width:.7em;
        mask: none;
        background:$icon-price no-repeat center center;
        background-size: auto 100%;
    }
    &.icon-camera{
        mask-image:$icon-camera;
        -webkit-mask-image:$icon-camera;
    }
    &.icon-arrow-right,&.icon-arrow-left{
        mask-image:$icon-arrow;
        -webkit-mask-image:$icon-arrow;
    }
    &.icon-arrow-up,&.icon-arrow-down{
        mask-image:$icon-arrow-down;
        -webkit-mask-image:$icon-arrow-down;
    }
    &.icon-arrow-up,&.icon-arrow-left{transform: rotate(180deg);}


    &.icon-arrow-circle-up,&.icon-arrow-circle-right,&.icon-arrow-circle-down,&.icon-arrow-circle-left{
        mask-image:$icon-arrow-circle;
        -webkit-mask-image:$icon-arrow-circle;
    }
    &.icon-arrow-circle-up{transform: rotate(180deg);}
    &.icon-arrow-circle-right{transform: rotate(-90deg);}
    &.icon-arrow-circle-left{transform: rotate(90deg);}

    &.icon-message{
        mask-image:$icon-message;
        -webkit-mask-image:$icon-message;
    }
    &.icon-message-2{
        mask-image:$icon-message-2;
        -webkit-mask-image:$icon-message-2;
    }
    &.icon-plus{
        mask-image:$icon-plus;
        -webkit-mask-image:$icon-plus;
    }
    &.icon-edit{
        mask-image:$icon-edit;
        -webkit-mask-image:$icon-edit;
    }
    &.icon-times{
        mask-image:$icon-times;
        -webkit-mask-image:$icon-times;
    }
    &.icon-true-fill-circle{
        mask-image:$icon-true-fill-circle;
        -webkit-mask-image:$icon-true-fill-circle;
    }
    &.icon-clap{
        mask: none;
        background:$icon-clap no-repeat center center;
        background-size: auto 100%;
    }
    &.icon-clap-active{
        mask: none;
        background:$icon-clap-active no-repeat center center;
        background-size: auto 100%;
    }
    &.icon-heart{
        mask: none;
        background:$icon-heart no-repeat center center;
        background-size: auto 100%;
    }
    &.icon-user-true{
        mask: none;
        background:$icon-user-true no-repeat center center;
        background-size: auto 100%;
    }
    &.icon-verify{
        mask: none;
        background:$icon-verify no-repeat center center;
        background-size: auto 100%;
    }
    &.icon-copy{
        mask-image:$icon-copy;
        -webkit-mask-image:$icon-copy;
    }
    &.icon-close{
        mask-image:$icon-close;
        -webkit-mask-image:$icon-close;
    }
}
</style>
