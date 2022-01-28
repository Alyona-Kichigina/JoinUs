import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { PaginationContainer } from "./styles"
import {ArrowRight, ArrowLeft} from "../../pages/Constants";

const PaginationDatsIcon = `
<svg fill="none" height="16" width="16" viewBox="0 0 12 3">
<circle cx="9.8999" cy="2.5" r="1.4" transform="rotate(90 9.8999 1.5)" fill="#56809F"></circle>
<circle cx="5.69995" cy="2" r="1.4" transform="rotate(90 5.69995 1.5)" fill="#56809F"></circle>
<circle cx="1.5" cy="1.4" r="1.4" transform="rotate(90 1.5 1.5)" fill="#56809F"></circle>
</svg>
`


const Pagination = ({ paginationState: { currentPage, totalPages, cupReached }, emitPage, className }) => {
  const prevButton = useMemo(() => currentPage > 1 ? currentPage - 1 : undefined, [currentPage])
  const nextButton = useMemo(
    () => (totalPages ? currentPage < totalPages : !cupReached) ? currentPage + 1 : undefined,
    [currentPage, totalPages, cupReached]
  )

  const buttons = useMemo(() => {
    // для пагинации с неясным колличеством мы присваем кол-во страниц равное текущей странице и двигаемся по стрелочке,
    // либо храним максимальную страницу и присваем ее
    const result = []
    // первая и последняя страницы пагинации добавляются отдельно
    result.push({ page: 1, current: currentPage === 1 })
    let offsetIndex = totalPages - currentPage > 3 ? currentPage - 3 : currentPage - 3 - 3 + (totalPages - currentPage) - 1
    let endIndex = currentPage > 3 ? offsetIndex + 7 : currentPage + 3 + 3 - currentPage + 2
    // если мы на первой странице, то проставляем endIndex
    if (offsetIndex < 2) {
      offsetIndex = 2
      endIndex = 9
    }
    endIndex = endIndex < totalPages ? endIndex : totalPages
     // три точки добавляем только при условии, что центральный рендж начинается не с двойки
    if (offsetIndex !== 2) {
      result.push({ disabled: true, icon: PaginationDatsIcon })
    }
    // в цикле генерим рейдж по середине
    for (offsetIndex; offsetIndex < endIndex; offsetIndex++) {
      result.push({ page: offsetIndex, current: offsetIndex === currentPage })
    }
    //  три точки добавляем только при условии, что центральный рендж кончается не предпоследним
    if (endIndex !== totalPages) {
      result.push({ disabled: true, icon: PaginationDatsIcon })
    }
    if (totalPages && totalPages !== 1) {
      result.push({ page: totalPages, current: currentPage === totalPages })
    }
    return result
  }, [currentPage, totalPages])

  function gotToPage(page) {
    return () => {
      emitPage(page)
    }
  }
  return (
    <div className={`${className} flex items-center justify-center`}>
      <PaginationContainer>
        {prevButton
          ? (
            <div
              className="pagination-item cursor"
              onClick={gotToPage(currentPage - 1)}
              dangerouslySetInnerHTML={{__html: ArrowLeft}}
            />
          )
          : (<div className="p-r-16 pagination-item" />)}
        {buttons.map(({ page, current, icon, disabled }, i) => (
          <button
            type="button"
            key={i}
            className={`pagination-item fs-14 color-light-blue-2
             ${current ? "pagination-current-page" : ""}`}
            disabled={current || disabled}
            onClick={gotToPage(page)}
          >
            { icon ? <div dangerouslySetInnerHTML={{__html: icon}} /> : <span>{page}</span>}
          </button>
        ))}
        {nextButton
          ? (
            <div
              className="pagination-item color-greyDarken cursor"
              dangerouslySetInnerHTML={{__html: ArrowRight}}
              onClick={gotToPage(nextButton)}
            />
          )
          : (<div className="p-r-16 pagination-item" />)}
      </PaginationContainer>
    </div>
  )
}

Pagination.propTypes = {
  paginationState: PropTypes.object,
  className: PropTypes.string,
}
Pagination.defaultProps = {
  paginationState: {},
  className: ""
}
export default Pagination
