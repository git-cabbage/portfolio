const section = document.querySelectorAll("section");
const li = document.querySelectorAll("li");
const btn = document.querySelectorAll("button");
const container = document.getElementsByClassName("container");

var index = 0;
const idlePeriod = 500;
var lastAnimation = 500;
const duration = 200;

console.log("300 milisecond/click");
console.log("ArrowUp / ArrowDown");
console.log("Scroll");
console.log("Click Button");

/* 
    !: scroll to top after refesh
*/
const onTop = () => {
  index = 0;
  console.log("Page:", index + 1);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
// onTop();

/* 
    !: logic to call func event click button left page
*/
li.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    var currentTime = new Date().getTime();

    if (currentTime - lastAnimation < idlePeriod + duration) {
      e.preventDefault();
      return;
    }
    handleClick(i);
    lastAnimation = currentTime;
    return () => {
      item.removeEventListener("click");
    };
  });
});

/* 
    !: logic to call func event click button next or prev
*/
btn.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    var currentTime = new Date().getTime();

    if (currentTime - lastAnimation < idlePeriod + duration) {
      e.preventDefault();
      return;
    }

    if (i === 0) {
      index--;
      handlePrev(index);
    } else {
      index++;
      handleNext(index);
    }
    lastAnimation = currentTime;
    return () => {
      item.removeEventListener("click");
    };
  });
});

/* 
    !: excute event click buttons right page
*/
const handleClick = (i) => {
  index = i;

  if (i > section.length - 1) {
    onTop();
  } else {
    section[i].scrollIntoView({
      behavior: "smooth",
    });
    console.log("Page:", i + 1);
  }
};

/* 
    !: excute next section
*/
const handleNext = (i) => {
  if (i > section.length - 1) {
    onTop();
  } else {
    section.forEach((item, index) => {
      if (i === index) {
        item.scrollIntoView({ behavior: "smooth" });
      }
    });
    console.log("Page:", i + 1);
  }
};

/* 
    !: excute prev section
*/
const handlePrev = (i) => {
  if (i < 0) {
    return (index = 0);
  } else {
    section.forEach((item, index) => {
      if (i === index) {
        item.scrollIntoView({ behavior: "smooth" });
      }
    });
    console.log("Page:", i + 1);
  }
};

/* 
    !: excute event scroll page
*/
const handleWheel = (e) => {
  var delta = e.wheelDelta;
  var currentTime = new Date().getTime();

  if (currentTime - lastAnimation < idlePeriod + duration) {
    e.preventDefault();
    return;
  }

  if (delta > 0) {
    const prevClick = new Event("click");
    btn[0].dispatchEvent(prevClick);
  } else {
    const nextClick = new Event("click");
    btn[1].dispatchEvent(nextClick);
  }
  lastAnimation = currentTime;
};

/* 
    !: press key arrowup or arrowdown to change section
*/
window.addEventListener("keyup", (e) => {
  var currentTime = new Date().getTime();

  if (currentTime - lastAnimation < idlePeriod + duration) {
    e.preventDefault();
    return;
  }

  if (e.code === "ArrowDown") {
    index++;
    handleNext(index);
  }
  if (e.code === "ArrowUp") {
    index--;
    handlePrev(index);
  }
  lastAnimation = currentTime;
  return () => {
    window.removeEventListener("keyup");
  };
});

/*
   !: scroll mouse to next or prev change section
*/
container[0].addEventListener("wheel", (e) => {
  handleWheel(e);
  return () => {
    container[0].removeEventListener("wheel");
  };
});
