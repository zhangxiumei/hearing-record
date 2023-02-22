<template>
    <div class="clearfix page-content">
        <div class="page-left">
            <hearing-record :list="list"></hearing-record>

        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data: function () {
        return {
            list: ['问：第一问', '答：第一答']
        }
    },

}
</script>
