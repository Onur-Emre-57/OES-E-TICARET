//* ===================================================
//*                 Checkout Page Solution
//*  map filter, dest, bubbling ===================================================
//!table da kullanılacak değişkenler
const shipping = 15.0;
const tax = 0.18;

let sepettekiler = [
  { name: "Vintage Backpack", price: 34.99, piece: 1, img: "./img/photo1.png" },
  { name: "Levi Shoes", price: 40.99, piece: 1, img: "./img/photo2.png" },
  { name: "Antique Clock", price: 69.99, piece: 1, img: "./img/photo3.jpg" },
];

//!EKRANA BASTIRMA

sepettekiler.forEach(({ img, name, price, piece }) => {
  // dest
  //   const{img,name,price}=urun

  document.querySelector("#product-rowlari").innerHTML += `
    <div class="card mb-3" style="max-width: 540px;">

  <div class="row ">

    <div class="col-md-5 ">
      <img src=${img}  class=" w-100 rounded-start" alt="...">
    </div>

    <div class="col-md-7 ">

      <div class="card-body">
      
        <h5 class="card-title">${name}</h5>
        
             <div class="ürün-price">
                    <p class="text-warning h2">$
                      <span class="indirim-price">${(price * 0.7).toFixed(
                        2
                      )} </span>
                      <span class="h5 text-dark text-decoration-line-through">${price}</span>
                    </p>
                  </div>

                  
                  <div
                    class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                  >
                    <div class="adet-controller ">
                      <button class="btn btn-secondary btn-sm minus">
                        <i class="fas fa-minus"></i>
                      </button>
                      <p class="d-inline mx-4" id="ürün-adet">${piece}</p>
                      <button class="btn btn-secondary btn-sm plus">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>

                  </div>

                  <div class="ürün-removal mt-4">
                    <button class="btn btn-danger btn-sm w-100 remove-product">
                      <i class="fa-solid fa-trash-can me-2"></i>Remove
                    </button>
                  </div>

                  <div class="mt-2">
                    Ürün Toplam: $<span class="product-total">${(
                      price *
                      0.7 *
                      piece
                    ).toFixed(2)} </span>
                  </div>
      </div>
    </div>
  </div>
</div>
    `;
});

//!browserdaki toplam fiyatların olduğu table ı güncelleme fonksiyonu
calculateCardTotal();

removeButton();

pieceButton();

//!SİLME FONKSİYONU

function removeButton() {
  document.querySelectorAll(".remove-product").forEach((btn) => {
    btn.onclick = () => {
      //?ekrandan sil

      // btn.parentElement.parentElement.parentElement.parentElement.remove()
      btn.closest(".card").remove();

      calculateCardTotal();
    };
  });
}

//! ADET DEĞİŞTİRME FONKSİYONU

function pieceButton() {
  document.querySelectorAll(".adet-controller").forEach((kutu) => {
    const plus = kutu.lastElementChild;
    const minus = kutu.firstElementChild;
    const adet = plus.previousElementSibling;
    // const adet=kutu.children[1]

    //!plus butonuna basınca olacaklar

    plus.onclick = () => {
      //ekranda adet güncelledik
      adet.textContent = +adet.textContent + 1;

      //ürünün carddaki toplamının güncellenmesi
      plus.closest(".card-body").querySelector(".product-total").textContent =
        plus.closest(".card-body").querySelector(".indirim-price").textContent *
        adet.textContent;

      calculateCardTotal();
    };

    //!minus a basınca olacaklar
    minus.onclick = () => {
      //ekranda adet güncelledik
      adet.textContent = adet.textContent - 1;

      //ürünün carddaki toplamının güncellenmesi
      minus.closest(".card-body").querySelector(".product-total").textContent =
        minus.closest(".card-body").querySelector(".indirim-price")
          .textContent * adet.textContent;

      calculateCardTotal();

      //!adet 1 iken minus a basılırsa ürün ekrandan silinsin
      if (adet.textContent < 1) {
        alert("sileyim mi?");

        minus.closest(".card").remove();
      }
    };
  });
}

//! Card toplam değerini hesaplama

function calculateCardTotal() {
  const toplam = document.querySelectorAll(".product-total");

  //!   querySelectorAll(), statik bir NodeList döndürür.
  //!burada netten https://softauthor.com/javascript-htmlcollection-vs-nodelist/
  // Dizi Değil!
  // Bir NodeList bir dizi gibi görünebilir ama öyle değildir.
  // Bir NodeList içinde döngü yapabilir ve düğümlerine dizine göre başvurabilirsiniz.
  // Ancak, bir NodeList'te reduce(), push(), pop() veya join() gibi Array yöntemlerini kullanamazsınız.

  //? pToplam= en alttaki tüm ürünler için vergi ve kargo hariç sepettekilerin indirimli fiyat toplamı
  //?Reduce tam olarak Array istiyor, nodelist yeterli değil

  const pToplam = Array.from(toplam).reduce(
    (acc, item) => acc + Number(item.textContent),
    0
  );

  document.querySelector(".productstoplam").textContent = pToplam;

  document.querySelector(".vergi").textContent = pToplam * tax;

  document.querySelector(".kargo").textContent = pToplam ? shipping : 0;

  document.querySelector(".toplam").textContent = pToplam
    ? pToplam + pToplam * tax + shipping
    : 0;
}

//!BUBBLİNG

let flag = false;

let h1 = document.querySelector("h1");

h1.onclick = (e) => {
  flag = !flag;
  flag
    ? (h1.textContent = "Checkout Project")
    : (h1.textContent = "Cash-Carry");

  //!çalış ve sonra parent ını etkileme
  e.stopPropagation();
};

let header = document.querySelector("header");

header.onclick = () => {
  flag = !flag;
  flag ? (h1.textContent = "seni ezdim") : (h1.textContent = "tamam kızma");
};
