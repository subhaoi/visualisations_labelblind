import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProviderService} from "../provider/provider.service";
import {eventService} from "../provider/eventService";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts'


@Component({
    selector: 'app-root',
    templateUrl: './labelblind_score.component.html',
    styleUrls: ['./labelblind_score.component.css']
})
export class LabelBlindScoreComponent implements OnInit {
    
    processed = [];
    temp_output;

    // Controlling display of elements on the frontend
    showHistogram = false;
    productverticals_dropdown = false;
    categories_dropdown = false;
    subcategories_dropdown = false;
    brands_dropdown = false;

    // Default values
    selectedHierarchy = 'product_vertical';

    // Dropdown variables
    productverticals_dropdownList = []; productverticals_selectedItems = []; productverticals_dropdownSettings = {};
    categories_dropdownList = []; categories_selectedItems = []; categories_dropdownSettings = {};
    subcategories_dropdownList = []; subcategories_selectedItems = []; subcategories_dropdownSettings = {};
    brands_dropdownList = []; brands_selectedItems = []; brands_dropdownSettings = {};


    temp_list = []
    selectedStory: any;
    histogram_output;


    constructor(public  restApi: ProviderService,
        private service: eventService,
        public http: HttpClient) {
    }
    lineChartData: ChartDataSets[] = [
      { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices',fill:false },
      ];
  
      lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  
      lineChartOptions = {
      responsive: true,
      };
  
      lineChartColors: Color[] = [
      {
          borderColor: 'black',
          backgroundColor: 'rgba(255,255,0,0.28)',
      },
      ];
  
      lineChartLegend = true;
      lineChartPlugins = [];
      lineChartType = 'line';
  
  
    ngOnInit() {
        
        this.service.setLoader('true');
        this.restApi.getProductVerticals().then((result) =>{
          this.service.setLoader('false');
          if (result['error'] === false) {
                
          }
          this.temp_output = result['result'];
          const pseudo_list =[]
              for(var temp in this.temp_output){
                pseudo_list.push({id:this.temp_output[temp]["product_verticals_id"], product_verticals_name:this.temp_output[temp]["product_verticals_name"]})
              }
              this.productverticals_dropdownList = pseudo_list;
        })
        this.restApi.getLabelBlindScore('product_vertical','all','all','all','all').then((result) => {
            this.service.setLoader('false');
            if (result['error'] === false) {
                
            }
            this.temp_output = result['result'];
            
          })


          this.productverticals_dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'product_verticals_name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            limitSelection:8,
          };
          this.categories_dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'CatName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            limitSelection:8
          };
          this.subcategories_dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'subCatName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            limitSelection:8
          };
          this.brands_dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'brandName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            limitSelection:8
          };

        }

                
        productverticals_onItemSelect(item: any) {


        }
        productverticals_onDropDownClose(items: any) {
          // console.log("product verticals triggered");
          // console.log(this.productverticals_selectedItems);
          
          // this.getLabelBlindScoreBrand(pseudo_string);
        }

        categories_onClick(items: any){
          const selected_product_vertical_list =[]
          for(var temp in this.productverticals_selectedItems){
            selected_product_vertical_list.push(this.productverticals_selectedItems[temp]["id"])
          }
          const product_vertical_string = selected_product_vertical_list.join(",");
          // console.log(product_vertical_string);
          this.restApi.getCategory(product_vertical_string).then((result) => {
            this.service.setLoader('false');
            if (result['error'] === false) {
                
            }
            // console.log(result['result']);
            this.temp_output = result['result'];
            const pseudo_list =[]
              for(var temp in this.temp_output){
                pseudo_list.push({id:this.temp_output[temp]["id"], CatName:this.temp_output[temp]["CatName"]})
              }
              this.categories_dropdownList = pseudo_list;
          })
        }
        categories_onItemSelect(item: any) {
          console.log(item);
        }
        categories_onDropDownClose(items: any) {
          console.log("categories triggered");

          // console.log(this.categories_selectedItems);
          // const pseudo_list =[]
          // for(var temp in this.categories_selectedItems){
          //   pseudo_list.push(this.categories_selectedItems[temp]["brandName"])
          // }
          // const pseudo_string = pseudo_list.join(",");
          // console.log(pseudo_string);
          // this.getLabelBlindScoreBrand(pseudo_string);
        }

        subcategories_onClick(items: any){
          const selected_categories_list =[]
          for(var temp in this.categories_selectedItems){
            selected_categories_list.push(this.categories_selectedItems[temp]["id"])
          }
          const categories_string = selected_categories_list.join(",");
          this.restApi.getSubCategory(categories_string).then((result) => {
            this.service.setLoader('false');
            if (result['error'] === false) {
                
            }
            this.temp_output = result['result'];
            const pseudo_list =[]
              for(var temp in this.temp_output){
                pseudo_list.push({id:this.temp_output[temp]["id"], subCatName:this.temp_output[temp]["subCatName"]})
              }
              this.subcategories_dropdownList = pseudo_list;
          })
        }

        subcategories_onItemSelect(item: any) {
          // console.log(item);
        }
        subcategories_onDropDownClose(items: any) {
          console.log("subcategories triggered");

          // console.log(this.subcategories_selectedItems);
          // const pseudo_list =[]
          // for(var temp in this.subcategories_selectedItems){
          //   pseudo_list.push(this.subcategories_selectedItems[temp]["brandName"])
          // }
          // const pseudo_string = pseudo_list.join(",");
          // console.log(pseudo_string);
          // this.getLabelBlindScoreBrand(pseudo_string);
        }

        brands_onClick(items: any){
          const selected_subcategories_list =[]
          for(var temp in this.subcategories_selectedItems){
            selected_subcategories_list.push(this.subcategories_selectedItems[temp]["id"])
          }
          const subcategories_string = selected_subcategories_list.join(",");
          this.restApi.getBrand(subcategories_string).then((result) => {
            this.service.setLoader('false');
            if (result['error'] === false) {
                
            }
            this.temp_output = result['result'];
            const pseudo_list =[]
              for(var temp in this.temp_output){
                pseudo_list.push({id:this.temp_output[temp]["id"], brandName:this.temp_output[temp]["brandName"]})
              }
              this.brands_dropdownList = pseudo_list;
          })
        }

        brands_onItemSelect(item: any) {
          // console.log(item);
        }
        brands_onDropDownClose(items: any) {
          console.log("brands triggered");

          // console.log(this.brands_selectedItems);
          // const pseudo_list =[]
          // for(var temp in this.brands_selectedItems){
          //   pseudo_list.push(this.brands_selectedItems[temp]["brandName"])
          // }
          // const pseudo_string = pseudo_list.join(",");
          // console.log(pseudo_string);
          // this.getLabelBlindScoreBrand(pseudo_string);
        }

       getLabelBlindScore(){
        const pv_list =[]
        for(var temp in this.productverticals_selectedItems){
          pv_list.push(this.productverticals_selectedItems[temp]["id"])
        }

        var pv_string = pv_list.join(",");
        if(pv_list.length == 0){
          pv_string = "all"
        }

        const c_list =[]
        for(var temp in this.categories_selectedItems){
          c_list.push(this.categories_selectedItems[temp]["id"])
        }
        var c_string = c_list.join(",");
        if(c_list.length == 0){
          c_string = "all"
        }

        const sc_list =[]
        for(var temp in this.subcategories_selectedItems){
          sc_list.push(this.subcategories_selectedItems[temp]["id"])
        }
        var sc_string = sc_list.join(",");
        if(sc_list.length == 0){
          sc_string = "all"
        }

        const b_list =[]
        for(var temp in this.brands_selectedItems){
          b_list.push(this.brands_selectedItems[temp]["id"])
        }
        var b_string = b_list.join(",");
        if(b_list.length == 0){
          b_string = "all"
        }

        this.restApi.getLabelBlindScore(this.selectedHierarchy,pv_string,c_string,sc_string,b_string).then((result) => {
            this.service.setLoader('false');
            if (result['error'] === false) {
                
            }
            this.temp_output = result['result'];
            // this.selectedHierarchy = hierarchy;
            
          })
        }

        setHierarchy(hierarchy){
          this.selectedHierarchy = hierarchy
          if (hierarchy == "product_vertical"){
              this.brands_dropdown = false;
              this.categories_dropdown = false;
              this.subcategories_dropdown = false;
              this.productverticals_dropdown = false;
              this.restApi.getLabelBlindScore(this.selectedHierarchy,'all','all','all','all').then((result) => {
                this.service.setLoader('false');
                if (result['error'] === false) {
                    
                }
                this.temp_output = result['result'];
                // this.selectedHierarchy = hierarchy;
                
              })
          }
          else if (hierarchy == "categories"){
            this.histogram_output = false;
            this.brands_dropdown = false;
            this.categories_dropdown = true;
            this.subcategories_dropdown = false;
            this.productverticals_dropdown = true;
            this.restApi.getLabelBlindScore(this.selectedHierarchy,'all','all','all','all').then((result) => {
              this.service.setLoader('false');
              if (result['error'] === false) {
                  
              }
              this.temp_output = result['result'];
              
            })
          }
          else if (hierarchy == "subcategories"){
            this.histogram_output = false;
            this.brands_dropdown = false;
            this.categories_dropdown = true;
            this.subcategories_dropdown = true;
            this.productverticals_dropdown = true;
            this.restApi.getLabelBlindScore(this.selectedHierarchy,'all','all','all','all').then((result) => {
              this.service.setLoader('false');
              if (result['error'] === false) {
                  
              }
              this.temp_output = result['result'];
              
            })
          }
          else if (hierarchy == "brands"){
            this.histogram_output = false;
            this.brands_dropdown = true;
            this.categories_dropdown = true;
            this.subcategories_dropdown = true;
            this.productverticals_dropdown = true;
            this.restApi.getLabelBlindScore(this.selectedHierarchy,'all','all','all','all').then((result) => {
              this.service.setLoader('false');
              if (result['error'] === false) {
                  
              }
              this.temp_output = result['result'];
              
            })
          }
        }

       
        onUpdate(userstory: any): void {
          this.selectedStory = userstory;
          console.log(this.selectedStory);
          this.showHistogram = true;
          this.service.setLoader('true');
        this.restApi.getLabelBlindScoreBuckets(this.selectedStory['hierarchy'],this.selectedHierarchy).then((result) => {
            this.service.setLoader('false');
            if (result['error'] === false) {
                
            }
            this.histogram_output = result['result'];
            console.log(this.histogram_output);
            this.processed = []
                        
              var temp_date = [];
              var temp_data = [];

            for(var [key,value] of Object.entries(this.histogram_output)){
              
                temp_data.push(value['lb_count']);
                temp_date.push(value['lb_score_buckets']);

            }
            this.processed.push({data:temp_data, label:this.selectedStory['hierarchy'], fill:true});

            console.log(this.processed);
            this.lineChartData = this.processed;
              this.lineChartLabels = Array.from(new Set(temp_date));
          });
              
        }
       }

