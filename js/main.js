// 풀페이지 스크롤 기능

document.addEventListener("DOMContentLoaded", (event) => {
  // 현재 보여지고 있는 섹션의 인덱스를 저장하는 변수
  let currentPage = 0;
  // 스크롤 중인지를 판별하는 플래그 변수 (true= 중 false= 아님)
  let isScrolling = false;

  function scrollEventHandler(event) {
    // 스크롤 중에 다른 이벤트 발생 못하게 방지
    if (isScrolling) return;

    isScrolling = true;

    // 설정한 시간 지나면 스크롤 중 플래그를 해제
    // 스크롤을 많이 하면 계속 넘어가는거 방지 (스크롤 중이면 추가 이벤트 발생 X)
    setTimeout(() => {
      isScrolling = false;
    }, 800);

    // 스크롤 방향을 결정하는 deltaY 값 가져오기
    const delta = event.deltaY;

    // 아래로 스크롤했고, 마지막 페이지가 아니라면 인덱스 증가
    if (
      delta > 0 &&
      currentPage < document.querySelectorAll(".page").length - 1
    ) {
      currentPage++;
    }
    // 위로 스크롤했고, 첫 번째 페이지가 아니라면 인덱스 감소
    else if (delta < 0 && currentPage > 0) {
      currentPage--;
    }

    // 계산된 인덱스로 페이지를 부드럽게 스크롤
    window.scrollTo({
      top: window.innerHeight * currentPage, // 섹션 인덱스에 따라 이동할 높이를 계산
      behavior: "smooth", // 스크롤 이동을 부드럽게 처리
    });
  }

  // 윈도우 객체에 wheel 이벤트 리스너를 추가 -> 스크롤 시 scrollEventHandler 함수를 호출
  window.addEventListener("wheel", scrollEventHandler);
});
