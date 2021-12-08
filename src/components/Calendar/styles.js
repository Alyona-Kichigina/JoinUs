import styled from "styled-components"

export const DayContainer = styled.span`
  font-size: 14px;
`

export const DayItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  position: relative;
  //color: var(--color-black-darken-1);
  transition: color 250ms ease-in-out;
  // выделение
  &::after {
    display: none;
    content: "";
    z-index: -1;
    position: absolute;
    background-color: var(--color-red);
    width: 100%;
    height: 100%;
  }
  &.startedDay,
  &:hover {
    color: var(--color-red);
  }
  // при наличии контента внутри
  &.withContent {
    text-align: right;
    .calendar-item-label {
      padding: 0.25rem 0.25rem 0;
    }
  }
  .calendar-item-label {
    font-size: 14px;
  }
  // цвет для дат внутри выделяемого ренджа
  &.inSelectRange {
    &:hover {
      color: var(--color-white);
    }
    &::after {
      display: block;
      background-color: var(--color-red);
    }
  }
  // сглаживем бордеры для дат которые находятся с левого края
  &.firstInRow {
    border-bottom-left-radius: 50%;
    border-top-left-radius: 50%;
    &::after {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
  }
  // сглаживем бордеры для дат которые находятся с правого края
  &.lastInRow {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    &::after {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }
  }
  // начало и конец ренджа выделения дат
  &.selected {
    z-index: 2;
    color: var(--color-white);
    background-color: var(--color-red);
    &.first {
      border-bottom-left-radius: 50%;
      border-top-left-radius: 50%;
    }
    &.last {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
    }
    &::after {
      display: block;
      border-radius: 50%;
      background-color: var(--color-red);
    }
  }
  &.disabled-date:not(.startedDay) {
    color: var(--color-green);
  }
`

export const MonthViewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 5px;
`

export const MonthViewHeader = styled.div`
  text-transform: uppercase;
  padding-bottom: 25px;
  padding-top: 18px;
  text-align: center;
  color: rgba(0, 0, 0, 0.543337);
  font-weight: 700;
`

export const YearViewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 4px;
`

export const YearItem = styled.button`
  min-height: 7em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  transition: color 250ms ease-in-out;
  &:hover {
    color: var(--color-red);
  }
`
export const DecadeItem = styled(YearItem)`
  min-height: 10em
`

export const NavigationButtonsContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const NavigationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  //color: var(--color-grey-darken-0);
`
export const NavigationLabel = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  //color: var(--color-black-darken-1)!important;
`
