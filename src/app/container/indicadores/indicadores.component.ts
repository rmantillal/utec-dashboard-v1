import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from 'src/app/services/servicio.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private servicio: ServicioService) { }

  formulario_busqueda!: FormGroup;
  public chart: any;
  public chart2: any;
  cUsuario: any;
  submitted!: boolean;
  lista_equipos: any = [{
    codigo: '1',
    descripcion: 'BOMBA HR 150_1 MOL 7X8 - CIRCUITO B'
  },
  {
    codigo: '2',
    descripcion: 'BOMBA HR 150_1 MOL 8X10 - CIRCUITO B'
  }, {
    codigo: '3',
    descripcion: 'BOMBA HR 150_2 MOL 7X8 - CIRCUITO B'
  }, {
    codigo: '4',
    descripcion: 'BOMBA HR 150_2 MOL 8X10 - CIRCUITO B'
  }, {
    codigo: '5',
    descripcion: 'BOMBA HR 200_1 - CIRCUITO A'
  }, {
    codigo: '6',
    descripcion: 'BOMBA HR 200_2 - CIRCUITO A'
  }, {
    codigo: '7',
    descripcion: 'BOMBA WARMAN 1A - CIRCUITO A'
  }, {
    codigo: '8',
    descripcion: 'BOMBA WARMAN 1B - CIRCUITO B'
  }, {
    codigo: '9',
    descripcion: 'BOMBA WARMAN 2A - CIRCUITO A'
  }, {
    codigo: '10',
    descripcion: 'BOMBA WARMAN 2B - CIRCUITO B'
  }, {
    codigo: '11',
    descripcion: 'FAJA TRANSPORTADORA 07 - CIRCUITO B'
  }, {
    codigo: '12',
    descripcion: 'FAJA TRANSPORTADORA 08 - CIRCUITO B'
  }, {
    codigo: '13',
    descripcion: 'FAJA TRANSPORTADORA 09 - CIRCUITO B'
  }, {
    codigo: '14',
    descripcion: 'FAJA TRANSPORTADORA 10 - CIRCUITO B'
  }, {
    codigo: '15',
    descripcion: 'FAJA TRANSPORTADORA 11 - CIRCUITO B'
  }, {
    codigo: '16',
    descripcion: 'FAJA TRANSPORTADORA 12 - CIRCUITO A'
  }, {
    codigo: '17',
    descripcion: 'FAJA TRANSPORTADORA 14A - CIRCUITO A'
  }, {
    codigo: '18',
    descripcion: 'FAJA TRANSPORTADORA 14B - CIRCUITO A'
  }, {
    codigo: '19',
    descripcion: 'FAJA TRANSPORTADORA 15 - CIRCUITO A'
  }, {
    codigo: '20',
    descripcion: 'FAJA TRANSPORTADORA 16 - CIRCUITO A'
  }, {
    codigo: '21',
    descripcion: 'MOLINO DE BARRAS PRIMARIO 9.5X12 - CIRCUITO A'
  }, {
    codigo: '22',
    descripcion: 'MOLINO DE BARRAS PRIMARIO 9.5X12 - CIRCUITO B'
  }, {
    codigo: '23',
    descripcion: 'MOLINO DE BOLAS 7X8 - CIRCUITO B'
  }, {
    codigo: '24',
    descripcion: 'MOLINO DE BOLAS SECUNDARIO 8X10 - CIRCUITO B'
  }, {
    codigo: '25',
    descripcion: 'MOLINO DE BOLAS SECUNDARIO 9.5X12 - CIRCUITO A'
  }
  ];

  lista_data: any = [
    /*{
      equipo: 'MOLINO DE BARRAS PRIMARIO 9.5X12',
      circuito: 'CIRCUITO A',
      frecuencia: 'Enero',
      mecanica: '92,50',
      time: '7,5',
      mtbf: '333,33',
      mttr: '26,66'
    },
    {
      equipo: 'MOLINO DE BARRAS PRIMARIO 9.5X12',
      circuito: 'CIRCUITO A',
      frecuencia: 'Febrero',
      mecanica: '91,00',
      time: '9',
      mtbf: '350,45',
      mttr: '14,2'
    },
    {
      equipo: 'MOLINO DE BARRAS PRIMARIO 9.5X12',
      circuito: 'CIRCUITO A',
      frecuencia: 'Marzo',
      mecanica: '98,00',
      time: '360,55',
      mtbf: '360,55',
      mttr: '13,11'
    }*/
  ];

  ngOnInit(): void {
    this.formulario_busqueda = this.formBuilder.group({
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      circuit_id: [null, Validators.required],
    });
  }

  get f() { return this.formulario_busqueda.controls; }

  buscar() {
    this.submitted = true;
    if (this.formulario_busqueda.invalid) {
      return;
    }
    this.servicio.buscar(this.formulario_busqueda.value).subscribe((data: any) => {
      this.lista_data = data.data;
      this.createChart(data.data);
      this.createChart2(data.data);
    });
  }

  createChart(data: any) {
    let mttr = [];
    let mtbf = [];
    let label = [];
    for (let i = 0; i < data.length; i++) {
      label.push(data[i].frecuencia);
      mttr.push(data[i].MTTR);
      mtbf.push(data[i].MTBF);
    }
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: label,
        datasets: [
          {
            label: "MTTR",
            data: mttr,
            backgroundColor: 'blue'
          },
          {
            label: "MTBF",
            data: mtbf,
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
  createChart2(data: any) {
    let mttr = [];
    let mtbf = [];
    
    this.chart = new Chart("MyChart2", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['DISPONIBILIDAD', 'DOWNTIME'],
        datasets: [{
          data: [91.30, 8.70]
        }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
}
