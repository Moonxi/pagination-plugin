var createPager = (function () {
  // 封装创建分页器函数
  function createPager(paginationsNumber = 10, pagerName = 'anonymous') {
    var pagerContainer = document.createElement('div')
    pagerContainer.className = 'pager-container'
    pagerContainer.setAttribute('pager-name', pagerName)
    pagerContainer.innerHTML = `<div class="pager-head">
    <a href="#" class="pager-first-page disabled">首页</a>
    <a href="#" class="pager-prev disabled">上一页</a>
  </div>
  <div class="pager-body">
    <a href="#" class="pager-item active">1</a>
  </div>
  <div class="pager-foot">
    <a href="#" class="pager-next disabled">下一页</a>
    <a href="#" class="pager-last-page disabled">尾页</a>
    <a href="#" class="pager-jump-to">跳转</a>
    <input type="text" class="pager-number" />
    <span class="pager-current-number">1/100</span>
  </div>`
    document.body.append(pagerContainer)
    function _initPager() {
      // 定义显示页码个数
      var numberOfPaginations = paginationsNumber
      // 当前页码
      var curPagination = 0
      // 当前显示的页码数组
      var curPaginations = []
      // 从服务器获取页码总数
      var maxPagination = 100
      //
      // 获取需要操作的dom元素
      var pagerBody = pagerContainer.querySelector('.pager-body')
      var pagerFisrtPage = pagerContainer.querySelector('.pager-first-page')
      var pagerLastPage = pagerContainer.querySelector('.pager-last-page')
      var pagerPrev = pagerContainer.querySelector('.pager-prev')
      var pagerNext = pagerContainer.querySelector('.pager-next')
      var pagerJumpTo = pagerContainer.querySelector('.pager-jump-to')
      var pagerNumber = pagerContainer.querySelector('.pager-number')
      var pagerCurrentNumber = pagerContainer.querySelector('.pager-current-number')
      // 定义初始化函数
      var init = function () {
        moveTo(1)
        initEvents()
      }
      // 定义事件处理函数
      var eventHandlers = {
        // 切换至首页
        moveToFirstPage(e) {
          moveTo(1)
        },
        // 切换至尾页
        moveToLastPage(e) {
          moveTo(maxPagination)
        },
        // 跳转至指定页码
        jumpTo(e) {
          var number = parseInt(pagerNumber.value)
          if (number) {
            moveTo(number)
          }
        },
        // 上一页
        prev(e) {
          moveTo(curPagination - 1)
        },
        // 下一页
        next(e) {
          moveTo(curPagination + 1)
        },
        /**
         * 页码点击事件
         * @param {MouseEvent} e
         * @this {HTMLElement}
         */
        clickPagination(e) {
          if (Array.prototype.slice.call(this.children).indexOf(e.target) === -1) {
            return
          }
          var number = parseInt(e.target.innerHTML)
          if (number) {
            moveTo(number)
          }
        }
      }
      // 定义初始化事件函数
      function initEvents() {
        pagerFisrtPage.addEventListener('click', eventHandlers.moveToFirstPage)
        pagerLastPage.addEventListener('click', eventHandlers.moveToLastPage)
        pagerJumpTo.addEventListener('click', eventHandlers.jumpTo)
        pagerPrev.addEventListener('click', eventHandlers.prev)
        pagerNext.addEventListener('click', eventHandlers.next)
        pagerBody.addEventListener('click', eventHandlers.clickPagination)
      }
      // 定义切换页面函数
      function moveTo(pagination) {
        // 定义根据当前页码数组生成页码元素的函数
        function _createPagination() {
          pagerBody.innerHTML = ''
          for (var i = 0; i < curPaginations.length; i++) {
            var pagerItem = document.createElement('a')
            pagerItem.innerHTML = curPaginations[i]
            pagerItem.style.cursor = 'pointer'
            pagerItem.className = 'pager-item'
            if (curPaginations[i] === pagination) {
              pagerItem.classList.add('active')
            }
            pagerBody.append(pagerItem)
          }
        }
        if (pagination < 1 || pagination > maxPagination || pagination === curPagination) {
          return
        }
        // 若当前页码数组为空，则初始化页码数组
        if (curPaginations.length === 0) {
          for (var i = pagination; i < pagination + numberOfPaginations; i++) {
            curPaginations.push(i)
          }
        }
        // 若切换的页码不在当前页码数组内，则生成新页码数组
        if (curPaginations.indexOf(pagination) === -1) {
          var newPaginations = []
          // 分两种情况
          if (pagination - curPagination === 1) {
            for (var i = pagination - numberOfPaginations + 1; i <= pagination; i++) {
              newPaginations.push(i)
            }
          } else {
            for (var i = pagination; i < pagination + numberOfPaginations; i++) {
              newPaginations.push(i)
            }
          }
          curPaginations = newPaginations
        }
        // 处理页码数组超出最大值情况
        if (curPaginations[curPaginations.length - 1] > maxPagination) {
          curPaginations = []
          for (var i = maxPagination - numberOfPaginations + 1; i <= maxPagination; i++) {
            curPaginations.push(i)
          }
        }
        // 根据当前页码数组生成页码
        _createPagination()
        // 切换完成后设置当前页码为新页码
        curPagination = pagination
        pagerCurrentNumber.innerHTML = curPagination + '/' + maxPagination
        // 若当前页码为首页或者尾页，则禁用相应按钮,否则启用
        if (curPagination === 1) {
          pagerFisrtPage.classList.add('disabled')
          pagerPrev.classList.add('disabled')
        } else {
          pagerFisrtPage.classList.remove('disabled')
          pagerPrev.classList.remove('disabled')
        }
        if (curPagination === maxPagination) {
          pagerLastPage.classList.add('disabled')
          pagerNext.classList.add('disabled')
        } else {
          pagerLastPage.classList.remove('disabled')
          pagerNext.classList.remove('disabled')
        }
      }
      init()
    }
    _initPager()
    return pagerContainer
  }
  /**
   * 以下为分页器核心代码示例
   */
  // 定义显示页码个数
  var numberOfPaginations = 10
  // 当前页码
  var curPagination = 0
  // 当前显示的页码数组
  var curPaginations = []
  // 从服务器获取页码总数
  var maxPagination = 100
  //
  // 获取需要操作的dom元素
  var pagerBody = document.querySelector('.pager-body')
  var pagerFisrtPage = document.querySelector('.pager-first-page')
  var pagerLastPage = document.querySelector('.pager-last-page')
  var pagerPrev = document.querySelector('.pager-prev')
  var pagerNext = document.querySelector('.pager-next')
  var pagerJumpTo = document.querySelector('.pager-jump-to')
  var pagerNumber = document.querySelector('.pager-number')
  var pagerCurrentNumber = document.querySelector('.pager-current-number')
  // 定义初始化函数
  var init = function () {
    moveTo(1)
    initEvents()
  }
  // 定义事件处理函数
  var eventHandlers = {
    // 切换至首页
    moveToFirstPage(e) {
      moveTo(1)
    },
    // 切换至尾页
    moveToLastPage(e) {
      moveTo(maxPagination)
    },
    // 跳转至指定页码
    jumpTo(e) {
      var number = parseInt(pagerNumber.value)
      if (number) {
        moveTo(number)
      }
    },
    // 上一页
    prev(e) {
      moveTo(curPagination - 1)
    },
    // 下一页
    next(e) {
      moveTo(curPagination + 1)
    },
    /**
     * 页码点击事件
     * @param {MouseEvent} e
     * @this {HTMLElement}
     */
    clickPagination(e) {
      if (Array.prototype.slice.call(this.children).indexOf(e.target) === -1) {
        return
      }
      var number = parseInt(e.target.innerHTML)
      if (number) {
        moveTo(number)
      }
    }
  }
  // 定义初始化事件函数
  function initEvents() {
    pagerFisrtPage.addEventListener('click', eventHandlers.moveToFirstPage)
    pagerLastPage.addEventListener('click', eventHandlers.moveToLastPage)
    pagerJumpTo.addEventListener('click', eventHandlers.jumpTo)
    pagerPrev.addEventListener('click', eventHandlers.prev)
    pagerNext.addEventListener('click', eventHandlers.next)
    pagerBody.addEventListener('click', eventHandlers.clickPagination)
  }
  // 定义切换页面函数
  function moveTo(pagination) {
    // 定义根据当前页码数组生成页码元素的函数
    function _createPagination() {
      pagerBody.innerHTML = ''
      for (var i = 0; i < curPaginations.length; i++) {
        var pagerItem = document.createElement('a')
        pagerItem.innerHTML = curPaginations[i]
        pagerItem.style.cursor = 'pointer'
        pagerItem.className = 'pager-item'
        if (curPaginations[i] === pagination) {
          pagerItem.classList.add('active')
        }
        pagerBody.append(pagerItem)
      }
    }
    if (pagination < 1 || pagination > maxPagination || pagination === curPagination) {
      return
    }
    // 若当前页码数组为空，则初始化页码数组
    if (curPaginations.length === 0) {
      for (var i = pagination; i < pagination + numberOfPaginations; i++) {
        curPaginations.push(i)
      }
    }
    // 若切换的页码不在当前页码数组内，则生成新页码数组
    if (curPaginations.indexOf(pagination) === -1) {
      var newPaginations = []
      // 分两种情况
      if (pagination - curPagination === 1) {
        for (var i = pagination - numberOfPaginations + 1; i <= pagination; i++) {
          newPaginations.push(i)
        }
      } else {
        for (var i = pagination; i < pagination + numberOfPaginations; i++) {
          newPaginations.push(i)
        }
      }
      curPaginations = newPaginations
    }
    // 处理页码数组超出最大值情况
    if (curPaginations[curPaginations.length - 1] > maxPagination) {
      curPaginations = []
      for (var i = maxPagination - numberOfPaginations + 1; i <= maxPagination; i++) {
        curPaginations.push(i)
      }
    }
    // 根据当前页码数组生成页码
    _createPagination()
    // 切换完成后设置当前页码为新页码
    curPagination = pagination
    pagerCurrentNumber.innerHTML = curPagination + '/' + maxPagination
    // 若当前页码为首页或者尾页，则禁用相应按钮,否则启用
    if (curPagination === 1) {
      pagerFisrtPage.classList.add('disabled')
      pagerPrev.classList.add('disabled')
    } else {
      pagerFisrtPage.classList.remove('disabled')
      pagerPrev.classList.remove('disabled')
    }
    if (curPagination === maxPagination) {
      pagerLastPage.classList.add('disabled')
      pagerNext.classList.add('disabled')
    } else {
      pagerLastPage.classList.remove('disabled')
      pagerNext.classList.remove('disabled')
    }
  }
  init()
  return createPager
})()
