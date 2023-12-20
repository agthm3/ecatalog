const { Builder, By, Key, until } = require("selenium-webdriver");

(async function openEkatalogAndLogin() {
  let chrome = require("selenium-webdriver/chrome");
  let options = new chrome.Options();
  options.addArguments("--incognito");
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  const XLSX = require("xlsx");

  function readExcelFile(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  }

  // Contoh penggunaan
  const data = readExcelFile("LISTKOMPUTERTKDN.xlsx", "Acer");
  const namaProduk = data.map((row) => row["Nama Produk"]);

  try {
    // Buka website e-Katalog LKPP
    await driver.get("https://e-katalog.lkpp.go.id/");

    // Tunggu dan tutup pop-up awal
    let closeButton = await driver.wait(
      until.elementLocated(By.css(".modal-footer .btn.btn-danger")),
      10000
    );
    await closeButton.click();

    // Buka halaman login dan isi form login
    let loginButton = await driver.wait(
      until.elementLocated(By.css('a[href="/user/login"]')),
      10000
    );
    await driver.executeScript("arguments[0].click();", loginButton);

    await driver.wait(until.elementLocated(By.name("username")), 10000);
    await driver.findElement(By.name("username")).sendKeys("CEMERLANGAIRCOND");
    await driver.findElement(By.name("password")).sendKeys("WitirTeknik098)(*");

    await driver.findElement(By.id("btnLoginPenyedia")).click();

    // Tunggu dan tutup pop-up yang muncul setelah login

    closeButtonAgain = await driver.wait(
      until.elementLocated(By.css(".modal-footer .btn.btn-danger")),
      5000
    );
    await closeButtonAgain.click();

    let loginButtonAgain = await driver.wait(
      until.elementLocated(By.css('a[href="/user/login"]')),
      10000
    );
    await driver.executeScript("arguments[0].click();", loginButtonAgain);

    // Tunggu beberapa detik untuk memastikan pop-up sepenuhnya dimuat
    await driver.sleep(5000); // Tunggu 5 detik

    // Tunggu dan tutup pop-up yang muncul setelah login
    let closeAfterLoginButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[@class='modal-footer']/button[@class='btn btn-default']"
        )
      ),
      10000
    );

    // Gunakan JavaScript Executor untuk klik jika perlu
    await driver.executeScript("arguments[0].click();", closeAfterLoginButton);

    // klik tombol produk
    let clickProdukButton = await driver.wait(
      until.elementLocated(
        By.xpath("/html/body/div[2]/div[1]/div[3]/div/div/ul/li[4]/a")
      ),
      10000
    );

    // Gunakan JavaScript Executor untuk klik jika perlu
    await driver.executeScript("arguments[0].click();", clickProdukButton);

    // klik tombol produk
    let clickTambahProdukButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[2]/div[1]/div[3]/div/div/ul/li[4]/ul/li/div/div/a[1]"
        )
      ),
      10000
    );

    // Gunakan JavaScript Executor untuk klik jika perlu
    await driver.executeScript(
      "arguments[0].click();",
      clickTambahProdukButton
    );

    // Temukan elemen dan klik
    let elemenKomoditas = await driver.wait(
      until.elementLocated(By.id("select2-komoditas-container")),
      10000 // Tunggu maksimal 10 detik
    );
    await elemenKomoditas.click();

    // Temukan form search
    let searchBox = await driver.wait(
      until.elementLocated(By.css('input[type="search"]')), // Sesuaikan selector sesuai dengan elemen form search
      10000
    );

    // Masukkan teks dan tekan Enter
    await searchBox.sendKeys(
      "Komputer, Perlengkapan komputer, dan jaringan kabupaten gowa",
      Key.ENTER
    );

    // Temukan elemen dan klik
    let elemenUsulan = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[2]/div[3]/div/form/div/div/div/div/div[2]/div[1]/span/span[1]/span/span[1]"
        )
      ),
      10000 // Tunggu maksimal 10 detik
    );
    await elemenUsulan.click();

    // Temukan form search
    let searchBoxUsulan = await driver.wait(
      until.elementLocated(By.css('input[type="search"]')), // Sesuaikan selector sesuai dengan elemen form search
      10000
    );

    // Masukkan teks dan tekan Enter
    await searchBoxUsulan.sendKeys(
      "Pencantuman Etalase Komputer, Perlengkapan Komputer, dan Jaringan Kabupaten Gowa",
      Key.ENTER
    );

    //====================

    // Klik tombol login lagi jika perlu
    // (Tambahkan langkah ini jika diperlukan sesuai dengan perilaku website)

    // Periksa apakah sudah login dengan mencari elemen .btn-chat
    await driver.wait(until.elementLocated(By.css(".btn-chat")), 10000);
    console.log("Login berhasil.");
  } finally {
    // await driver.quit();
  }
})();
