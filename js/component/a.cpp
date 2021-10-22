#include<iostream>

// class A {
//     constructor() {
//         this.a = "20";
//         this.b = [];
//     }
// }

// console.log(new A());

class CA{
    public :
    CA(){
        a= 5;
    };
    int a  = 0;
    
};

int main(){
    //CA* a = new CA();
    CA a;
    std::cout<<a.a;
    return 0;
}