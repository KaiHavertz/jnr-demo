/** When your routing table is too long, you can split it into small modules**/


const echartsRouter = {
  path: '/echarts',
  name: 'Echarts',
  component: () => import('@/components/echarts/echarts.vue'),
  meta: {
    title: '图表',
    icon: 'chart'
  },
  children: [
    {
      path: 'mixChart',
      component: () => import('@/components/echarts/mixChart'),
      name: 'mixChart',
      meta: { title: '混合图表', noCache: true }
    }
  ]
}

export default echartsRouter
