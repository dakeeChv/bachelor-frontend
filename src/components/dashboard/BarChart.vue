<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  mounted() {
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
            data: [400, 200, 120, 390, 100, 400, 390, 0, 0, 0, 0, 0]
          },
          {
            label: 'ຜູ້ບໍລິຈາກເທື່ອທຳອິດ',
            backgroundColor: '#FF9100',
            data: [40, 100, 70, 190, 10, 100, 302, 0, 0, 0, 0, 0]
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
}
</script>
