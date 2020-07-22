import { Component , OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ProviderService} from "../provider/provider.service";
import {eventService} from "../provider/eventService";
import { Options } from 'ng5-slider';

@Component({
    selector: 'app-root',
    templateUrl: './nutrient_score.component.html',
    styleUrls: ['./nutrient_score.component.css']
})
export class NutrientScoreComponent implements OnInit {

    processed = [];
    temp_output;
    table_output;
    original_output;
    filterForm ;
    dropdownSettings;
    nutrientdropdownSettings;

    isShowBrand = false;
    dropdownList = [];
    nutrientdropdownList = [];
    selectedItems = [];
    nutrientselectedItems = [];
    temp_list = []
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



    minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
    
    constructor(public  restApi: ProviderService,
        private service: eventService,
        public http: HttpClient,
        private formBuilder: FormBuilder,
        ) {
        this.filterForm = this.formBuilder.group({
            minvalue: '',
            maxvalue:'',
            chosenmetric:''
            });
    }
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
        this.restApi.getNutrientList().then((result) => {
            this.service.setLoader('false');
            if (result['error'] === false) {
                
            }
            this.temp_output = result['result'];
            const pseudo_list =[]
              for(var temp in this.temp_output){
                pseudo_list.push({id:this.temp_output[temp]["options_id"], optionsName:this.temp_output[temp]["options_name"]})
              }
              console.log(pseudo_list);
              this.nutrientdropdownList = pseudo_list;
            
          })


          this.nutrientdropdownSettings = {
            singleSelection: true,
            idField: 'id',
            textField: 'optionsName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            limitSelection:8
          };

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


        }

       getNutrientScore(){
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
        console.log(this.nutrientselectedItems)

        this.restApi.getNutrientScore(this.selectedHierarchy,this.nutrientselectedItems[0]['id'], pv_string,c_string,sc_string,b_string).then((result) => {
            this.service.setLoader('false');
            if (result['error'] === false) {
                
            }
            this.original_output = result['result'];
            this.table_output = result['result'];
            var table_max_value = this.table_output.map(function(el) {
              return el.max_nutrient_value;
            });
            var table_min_value = this.table_output.map(function(el) {
              return el.min_nutrient_value;
            });


            this.minValue = Math.min(...table_min_value);
            this.maxValue = Math.max(...table_max_value)
            this.options ={ floor:0, ceil:Math.max(...table_max_value)}

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

          }
          else if (hierarchy == "categories"){
            this.brands_dropdown = false;
            this.categories_dropdown = true;
            this.subcategories_dropdown = false;
            this.productverticals_dropdown = true;
    
          }
          else if (hierarchy == "subcategories"){
            this.brands_dropdown = false;
            this.categories_dropdown = true;
            this.subcategories_dropdown = true;
            this.productverticals_dropdown = true;
        
          }
          else if (hierarchy == "brands"){
            this.brands_dropdown = true;
            this.categories_dropdown = true;
            this.subcategories_dropdown = true;
            this.productverticals_dropdown = true;
          
          }
        }

       
        

        onFilterSubmit(filtervalue){
            const pseudo_list =[]
            var filtermetric = filtervalue['chosenmetric'] + "_nutrient_value";
            if (filtervalue['chosenmetric'] == ""){
                filtermetric = "avg_nutrient_value";
            }
            for(var temp in this.original_output){
                if((this.original_output[temp][filtermetric] >= this.minValue )
                && (this.original_output[temp][filtermetric] <= this.maxValue))
              pseudo_list.push({id:temp, hierarchy:this.original_output[temp]["hierarchy"],
              avg_nutrient_value:this.original_output[temp]["avg_nutrient_value"],
              max_nutrient_value:this.original_output[temp]["max_nutrient_value"],
              min_nutrient_value:this.original_output[temp]["min_nutrient_value"],
              sd_nutrient_value:this.original_output[temp]["sd_nutrient_value"],
              nutrient:this.original_output[temp]["nutrient"]
            })
            }
            console.log(pseudo_list);
            this.table_output = pseudo_list;
        }


}

