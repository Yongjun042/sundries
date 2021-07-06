from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time

#개인정보 입력
id = "";
pw = ";
nick = "";
cell = "cell = document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('body')[0]; while ( cell.hasChildNodes() ) { cell.removeChild( cell.firstChild ); } cell.append('.');document.getElementById('subject').value='.';";

driver = webdriver.Firefox();
driver.implicitly_wait(3);
driver.get("https://extmovie.com/movietalk/my_comments");
driver.find_element_by_xpath("//a[@class='bt_bs bt_color']").click();
driver.find_element_by_id('uid').send_keys(id);
driver.find_element_by_id('upw').send_keys(pw);
driver.find_element_by_xpath("//button[@class='ib ib_color']").click();
driver.get("https://extmovie.com/movietalk/my_documents?page=1");

while(True):
    time.sleep(1);
    ul = driver.find_element_by_xpath("//div[@class='mb_content mb_list mb_document']/ul");
    lis = ul.find_elements_by_tag_name("li");
    for li in lis:
        comment = li.find_element_by_class_name('title_link');
        if(comment.text !='.' ):
            comment.send_keys(Keys.CONTROL +Keys.ENTER)  ;
            driver.switch_to.window(driver.window_handles[1]);
            try:
                driver.find_element_by_xpath("//a[text() = '수정']").send_keys(Keys.ENTER);
                time.sleep(1);
                driver.execute_script(cell);
                driver.find_element_by_xpath("//button[@class='ib ib2 ib_color'][@type='submit']").click();

                time.sleep(1);
            except NoSuchElementException:
                    print();
            finally:
                driver.close();
                driver.switch_to.window(driver.window_handles[0]);
    try:
        driver.find_element(By.XPATH,"//a[@class ='bt_last has_bubble']")
        driver.find_element_by_xpath("//a[@class ='bt_prev bt_next']").send_keys(Keys.ENTER);

    except NoSuchElementException:
        break;

'''
while(True):
    time.sleep(1);
    ul = driver.find_element_by_xpath("//div[@class='mb_content mb_list mb_comment']/ul");
    lis = ul.find_elements_by_tag_name("li");
    for li in lis:
        comment = li.find_element_by_class_name('comment_content').find_element_by_tag_name("a");
        if(comment.text !='.' and comment.text != '역시 출연진이 빵빵하네요'):
            comNo = comment.get_attribute('href').split('#')[1];
            comment.send_keys(Keys.CONTROL +Keys.ENTER)  ;
            driver.switch_to.window(driver.window_handles[1]);
            try:
                pathe = "//article[@id = '" + comNo + "']";
                comm = driver.find_element_by_xpath(pathe);
                try:
                    comm.find_element_by_xpath("./div[@class='cmt_header']/div[@class='cmt_ctrl_wrap ctrl_wrap']/button[@class='bt_cmt_ctrl bt_ctrl']").click();
                    time.sleep(1);
                    driver.find_element_by_xpath(pathe + "/div[@class='cmt_header']/div[@class='cmt_ctrl_wrap ctrl_wrap']/div[@class='cmt_ctrl ctrl_body']/a[@class='bt_edit bt'][starts-with(@onclick, 'insertWarn')]");
                    driver.find_element_by_xpath(pathe + "/div[@class='cmt_header']/div[@class='cmt_ctrl_wrap ctrl_wrap']/div[@class='cmt_ctrl ctrl_body']/a[@class='bt_edit']").send_keys(Keys.ENTER);
                    time.sleep(1);
                    driver.execute_script(cell);
                    driver.find_element_by_xpath("//button[@class='ib ib2 ib_color'][@type='submit']").click();
                except NoSuchElementException:
                    driver.find_element_by_xpath(pathe + "/div[@class='cmt_header']/div[@class='cmt_ctrl_wrap ctrl_wrap']/div[@class='cmt_ctrl ctrl_body']/a[@class='bt_edit bt']").send_keys(Keys.ENTER);
                    driver.find_element_by_xpath("//button[@class='ib ib_color'][@type='submit']").send_keys(Keys.ENTER);
                
                finally:
                    driver.find_element_by_xpath(pathe + "/div[@class='ppcmt_body']/header[@class='ppcmt_header']/div[@class='ppcmt_edit']/a[2]").send_keys(Keys.ENTER);
                    driver.find_element_by_xpath("//button[@class='ppbt ppbt2 bt_color'][@type='submit']").send_keys(Keys.ENTER);
                time.sleep(1);


                time.sleep(1);
            except NoSuchElementException:
                    print();
            finally:
                driver.close();
                driver.switch_to.window(driver.window_handles[0]);
    try:
        driver.find_element(By.XPATH,"//a[@class ='bt_last has_bubble']")
        driver.find_element_by_xpath("//a[@class ='bt_prev bt_next']").send_keys(Keys.ENTER);

    except NoSuchElementException:
        break;

'''
