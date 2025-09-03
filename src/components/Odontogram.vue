<template>
  <div>
    <h3 class="rounded text-white" style="background-color: #d0cd9a; padding: 6px">
      Odontograma Demo Easyfind
    </h3>
    <div class="row p-3">
      <div class="col-lg-8 col-md-7 col-sm-12">
        <canvas
          id="canvas"
          class="img-responsive border border-primary rounded"
          width="660"
          height="700"
        ></canvas>
      </div>
      <div
        class="col-lg-4 col-md-5 col-sm-12 rounded"
        style="background-color: #d0cd9a; padding: 6px"
      >
        <div class="form-group">
          <b>Patient Type</b>
          <select v-model="data.patienttype" class="form-control form-control-sm">
            <option selected disabled value="">--Select Patient--</option>
            <option value="adult">Adult</option>
            <option value="childish">Child</option>
          </select>
          <div v-if="$v.data.patienttype.$error" class="help-block">
            <small v-if="!$v.data.patienttype.required" class="text-danger"
              >This field is required</small
            >
          </div>
        </div>
        <div class="form-group">
          <b>Position</b>
          <select v-model="data.position" class="form-control form-control-sm">
            <option selected disabled value="">--Select Position--</option>
            <option value="sup">Upper</option>
            <option value="inf">Lower</option>
          </select>
          <div v-if="$v.data.position.$error" class="help-block">
            <small v-if="!$v.data.position.required" class="text-danger"
              >This field is required</small
            >
          </div>
        </div>
        <div class="form-group">
          <b>Tooth</b>
          <select v-model="data.tooth" class="form-control form-control-sm">
            <option selected disabled>--Select Tooth--</option>
            <option v-for="x in teeth" :key="x.name" :value="x.name">
              {{ x.label }}
            </option>
          </select>
          <div v-if="$v.data.tooth.$error" class="help-block">
            <small v-if="!$v.data.tooth.required" class="text-danger">This field is required</small>
          </div>
        </div>
        <div class="form-group">
          <h6><b>Quadrant to Work On</b></h6>
          <div class="form-check form-check-inline">
            <input
              id="checkboxCuadranteV"
              v-model="data.quadrant.v"
              class="form-check-input"
              type="checkbox"
              name="checkboxCuadrante"
            />
            <label class="form-check-label" for="checkboxCuadranteV"> V </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="checkboxCuadranteD"
              v-model="data.quadrant.d"
              class="form-check-input"
              type="checkbox"
              name="checkboxCuadrante"
            />
            <label class="form-check-label" for="checkboxCuadranteD"> D </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="checkboxCuadranteO"
              v-model="data.quadrant.o"
              class="form-check-input"
              type="checkbox"
              name="checkboxCuadrante"
            />
            <label class="form-check-label" for="checkboxCuadranteO"> O </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="checkboxCuadranteM"
              v-model="data.quadrant.m"
              class="form-check-input"
              type="checkbox"
              name="checkboxCuadrante"
            />
            <label class="form-check-label" for="checkboxCuadranteM"> M </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="checkboxCuadranteP"
              v-model="data.quadrant.p"
              class="form-check-input"
              type="checkbox"
              name="checkboxCuadrante"
            />
            <label class="form-check-label" for="checkboxCuadranteP"> P </label>
          </div>
        </div>
        <div class="form-group">
          <b>Diagnosis</b>
          <select v-model="data.diagnostic" class="form-control form-control-sm">
            <option selected disabled>--Select Diagnosis--</option>
            <option v-for="x in diagnostic" :key="x.name" :value="x.value">
              {{ x.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <div class="form-check form-check-inline">
            <input
              id="checkboxTratar"
              v-model="data.treat"
              class="form-check-input"
              type="checkbox"
              name="checkboxTratar"
            />
            <label class="form-check-label" for="checkboxTratar"> Mark for Treatment </label>
          </div>
        </div>
        <div class="form-group">
          <b>Details</b>
          <textarea
            v-model="data.detail"
            class="form-control form-control-sm border-patient-controls"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-sm" @click="add">Add</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div v-if="odonto.datalist.length > 0">
          <table class="table">
            <tr>
              <th>Tooth</th>
              <th>Quadrants</th>
              <th>Diagnosis</th>
            </tr>
            <tr v-for="(x, index) in odonto.datalist" :key="index">
              <td>
                {{ x.tooth }}
              </td>
              <td>
                <pre>{{ x.quadrant }}</pre>
              </td>
              <td>
                {{ x.diagnostic }}
              </td>
            </tr>
          </table>
        </div>
        <div v-else>
          <span>No records in history.</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import teethdata from '@/assets/data/teethdata.json';
import diagnostic from '@/assets/data/diagnostic.json';

const defaultColor = '#000000';

export default {
  name: 'Odontogram',
  data: () => ({
    data: {
      position: '',
      patienttype: '',
      tooth: '',
      diagnostic: '',
      detail: '',
      treat: false,
      quadrant: {
        v: false,
        d: false,
        o: false,
        m: false,
        p: false
      }
    },
    ctx: {},
    diagnostic: diagnostic,
    odon: teethdata,
    odonto: {
      datalist: []
    }
  }),
  validations: {
    data: {
      position: { required },
      patienttype: { required },
      tooth: { required },
      diagnostic: { required }
    }
  },
  computed: {
    teeth: function () {
      let result = [];
      if (this.data.position == '' && this.data.patienttype == '') {
        result = this.odon.values.map((item) => {
          return {
            name: item.name,
            label: item.value
          };
        });
        return result;
      }

      if (this.data.position != '' && this.data.patienttype != '') {
        result = this.odon.values
          .filter((x) => x.prefix == this.data.position && x.type == this.data.patienttype)
          .map((item) => {
            return {
              name: item.name,
              label: item.value
            };
          });
        return result;
      }

      if (this.data.position != '') {
        result = this.odon.values
          .filter((x) => x.prefix == this.data.position)
          .map((item) => {
            return {
              name: item.name,
              label: item.value
            };
          });
        return result;
      }

      if (this.data.patienttype != '') {
        result = this.odon.values
          .filter((x) => x.type == this.data.patienttype)
          .map((item) => {
            return {
              name: item.name,
              label: item.value
            };
          });
        return result;
      }
      return result;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    clean() {
      this.data = {
        position: '',
        patienttype: '',
        tooth: '',
        diagnostic: '',
        detail: '',
        treat: false,
        quadrant: {
          v: false,
          d: false,
          o: false,
          m: false,
          p: false
        }
      };
      this.ctx.fillStyle = defaultColor;
    },
    init() {
      var self = this;
      var canvas = document.getElementById('canvas');
      self.ctx = canvas.getContext('2d');
      // clean context.
      self.ctx.setTransform(1, 0, 0, 1, 0, 0);
      self.ctx.clearRect(0, 0, canvas.width, canvas.height);
      self.ctx.restore();

      self.ctx.textAlign = 'center';
      self.ctx.fillStyle = defaultColor;
      self.ctx.font = '13px Arial';
      //Horizontal Line.
      self.drawLine(0, 340, 660, 340, '#C0C0C0');
      //Vertical Line.
      self.drawLine(330, 0, 330, 700, '#C0C0C0');

      for (let l of self.odon.settings.lines) {
        let x = l.initial;
        for (let i = 0; i < l.total; i++) {
          self.drawLine(x, l.x2, x, l.y2, l.color);
          x += l.length;
        }
      }

      for (let info of self.odon.values) {
        self.addImage(info);
      }

      canvas.addEventListener(
        'mousedown',
        function (event) {
          const bounds = canvas.getBoundingClientRect();
          self.captureEvent(event, bounds);
        },
        false
      );
    },
    captureEvent(event, bounds) {
      // Calculate mouse position relative to canvas
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      console.log('Captured click at:', x, y);

      // Now you can add logic to detect which tooth/quadrant was clicked
      // For example:
      for (let tooth of this.odon.values) {
        for (let q of tooth.cuadrantes) {
          const size = this.odon.settings.recSize;
          // Check if click is inside the rectangle
          if (x >= q.x && x <= q.x + size && y >= q.y && y <= q.y + size) {
            console.log(`Clicked quadrant ${q.name} of tooth ${tooth.name}`);
            // Optionally, fill the rectangle
            this.ctx.fillStyle = '#FF0000'; // or your diagnostic color
            this.drawRect(q.x, q.y, 1);
            return;
          }
        }
      }
    },

    drawLine(x, y, x2, y2, color) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.strokeStyle = color;
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    },
    addImage(info) {
      var self = this;
      let image = new Image();
      image.src = require(`@/assets/teeth/dentadura-${info.prefix}-${info.name}.png`);

      image.onload = function () {
        self.ctx.fillText(info.value, info.textposition.x, info.textposition.y);
        self.ctx.drawImage(this, info.imageposition.x, info.imageposition.y);

        for (let c of info.cuadrantes) {
          self.drawRect(c.x, c.y, 0.4);
        }
      };
    },
    drawRect(x, y, ga) {
      let size = this.odon.settings.recSize;
      this.ctx.beginPath();
      this.ctx.globalAlpha = ga;

      this.ctx.fillRect(x, y, size, size);

      this.ctx.globalAlpha = 1;
      this.ctx.restore();
    },
    add() {
      var self = this;
      self.$v.$touch();

      if (!self.$v.$invalid) {
        self.$v.$reset();
        const d = self.data;

        if (self.fill(d)) {
          self.odonto.datalist.push(self.data);
          this.clean();
        }
      }
    },
    fill(d) {
      var self = this;
      const piece = self.odon.values.filter(
        (item) => item.name == d.tooth && item.prefix == d.position && item.type == d.patienttype
      );

      if (piece.length >= 1) {
        let arr = [];

        if (d.quadrant.o) arr.push('o');

        if (d.quadrant.v) arr.push('v');

        if (d.quadrant.d) arr.push('d');

        if (d.quadrant.m) arr.push('m');

        if (d.quadrant.p) arr.push('p');

        const diag = self.diagnostic.filter((x) => x.value == d.diagnostic);
        self.ctx.fillStyle = defaultColor;
        if (diag.length >= 1) {
          self.ctx.fillStyle = diag[0].color;
        }
        for (let p of arr) {
          let q = piece[0].cuadrantes.filter((i) => i.name == p)[0];
          if (q) {
            self.drawRect(q.x, q.y, 1);
          }
        }
        return true;
      }
      return false;
    }
  }
};
</script>
