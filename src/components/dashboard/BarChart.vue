<script>
import { Bar } from 'vue-chartjs'
import { mapState } from 'vuex'
export default {
  extends: Bar,
  // props: ['firstTime', 'twoUp'],
  computed: {
    ...mapState('dashboard', ['firstTime', 'twoUp'])
  },
  mounted() {
    this.renderLineChart(this.twoUp, this.firstTime)
  },
  methods: {
    renderLineChart: function (twoUp, firstTime) {
      this.renderChart(
        {
          labels: [
            'ມັງກອນ',
            'ກຸມພາ',
            'ມີນາ',
            'ເມສາ',
            'ພືດສະພາ',
            'ມິຖຸນາ',
            'ກໍລະກົດ',
            'ສິງຫາ',
            'ກັນຍາ',
            'ຕຸລາ',
            'ພະຈິກ',
            'ທັນວາ'
          ],
          datasets: [
            {
              label: 'ຜູ້ບໍລິຈາກເທື່ອທີ 2 ຂື້ນໄປ',
              backgroundColor: '#303F9F',
              data: twoUp
              // data: [400, 200, 120, 390, 100, 400, 390, 0, 0, 0, 0, 0]
            },
            {
              label: 'ຜູ້ບໍລິຈາກເທື່ອທຳອິດ',
              backgroundColor: '#FF9100',
              data: firstTime
              // data: [40, 100, 70, 190, 10, 100, 302, 0, 0, 0, 0, 0]
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                  // OR //
                  beginAtZero: true, // minimum value will be 0.
                  suggestedMax: 10
                },
                gridLines: {
                  display: false
                },
                pointLabels: {
                  fontFamily: 'NotoSansLao'
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  fontFamily: 'NotoSansLao'
                }
              }
            ]
          }
        }
      )
    }
  },
  watch: {
    firstTime: function () {
      // this._chart.destroy();
      // //this.renderChart(this.data, this.options);
      this.renderLineChart(this.twoUp, this.firstTime)
    }
  }
}
</script>
