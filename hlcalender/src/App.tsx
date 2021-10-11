
import { DefaultButton, PrimaryButton, initializeIcons, Stack, Text, FontSizes, IconButton, IconFontSizes, values } from '@fluentui/react'
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup'
import useCalendar from '@veccu/react-calendar'
import { version } from '@veccu/react-calendar/package.json'
import { format } from 'date-fns'
import locale from 'date-fns/locale/en-US'
import React from 'react'

import './App.scss'


export default function App() {
  const { cursorDate, headers, body, navigation, view } = useCalendar();

  //이거
  initializeIcons();

  const viewOptions: IChoiceGroupOption[] = [
    { key: "M", text: "Month", iconProps: { iconName: 'Calendar' } },
    { key: "W", text: "Week", iconProps: { iconName: 'CalendarWeek' } },
    { key: "D", text: "Day", iconProps: { iconName: 'CalendarDay' } }
  ];

  const dwmChange = React.useCallback(
    (
      ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
      option?: IChoiceGroupOption
    ) => {
      switch (option?.key) {
        case 'M':
          view.showMonthView();
          break;
        case 'W':
          view.showWeekView();
          break;
        case 'D':
          view.showDayView();
          break;
      }
    },
    //여기
    [view]
  );

  return (
    <div className="body">
      <Stack
        padding={24}
        horizontalAlign="center"
      >
        <Stack.Item align="center" >
          <label className="badge">v{version}</label>
        </Stack.Item>
        <Stack.Item align="center">
          <h1 >
            react-calendar-basic-example
          </h1>
        </Stack.Item>
        <Stack.Item align="center">
          <Text style={{ fontSize: FontSizes.size18, paddingBottom:"12px" }} >
            Headless Calendar UI Library Example with Charkra UI
          </Text>
        </Stack.Item>

        <Stack.Item >
      <table width = "80%"  >
        <caption className="card">
          <Stack disableShrink horizontalAlign="center">


            <Stack.Item align="auto">
              <Text data-testid="cursor-date"  style={{ fontSize: FontSizes.size24 }} >
                {format(cursorDate, 'yyyy. MM')}
              </Text>
            </Stack.Item>

            <Stack.Item>
              <DefaultButton onClick={navigation.toPrev} iconProps={{iconName:"ChevronLeft"}}/>
              <PrimaryButton onClick={navigation.setToday}  iconProps={{iconName:"GotoToday"}}/>
              <DefaultButton onClick={navigation.toNext} iconProps={{iconName:"ChevronRight"}}/>
            </Stack.Item>

            <Stack.Item align="center">
              <ChoiceGroup
                label="Day, Week, Month view selector"
                defaultSelectedKey="M"
                options={viewOptions}
                onChange={dwmChange}
              />
            </Stack.Item>
          </Stack>
        </caption>
        <div className="card">
        <thead>
          <tr>
            {headers.weekDays.map(({ key, value }) => {
              return (
                <th key={key} data-testid="calendar-weekends">
                  {format(value, 'E', { locale })}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {body.value.map((week) => {
            const { key, value: days } = week

            return (
              <tr key={key} data-testid="calendar-weeks">
                {days.map((day) => {
                  const {
                    key,
                    date,
                    isCurrentDate,
                    isCurrentMonth,
                    isWeekend,
                  } = day
                  console.log(day);
                  return (
                    <td
                      key={key}
                      className ={isCurrentMonth ? "cmonth" : 'nmonth'}
                      data-testid={
                        isCurrentDate ? 'calendar-cell--today' : 'calendar-cell'
                      }
                    >
                      {isCurrentDate ? (
                        <Text className="now" aria-label={day.value.toISOString().substring(0, 10)}>
                          {date}
                        </Text>
                      ) : (
                        <Text className={isWeekend ? 'red' : ''} aria-label={day.value.toISOString().substring(0, 10)}>
                          {date}
                        </Text>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        </div>
      </table>
            </Stack.Item>
      </Stack>
    </div>
  )
}
