import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: { // MAIN CONTAINER
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    alignItems: 'center',
    minHeight: 29,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    zIndex: 9999,
  },
  iconWrapper: { // ICON WRAPPER
    height: '100%',
  },
  contentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  inputWrapper: { // INPUT AND LIST WRAPPER
    flex: 1,
    minWidth: 230,
  },
  input: { // TEXTINPUT
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
    margin: 2,
  },
  icon: { // SEARCH ICON ON THE LEFT
    marginHorizontal: 5,
  },
  chip: { // CHIP CONTAINER
    justifyContent: 'space-between',
    borderRadius: 4,
    backgroundColor: '#ececec',
    paddingHorizontal: 5,
    paddingVertical: 4,
    margin: 2,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    height: 23,
  },
  chipText: { // CHIP INNER TEXT
    fontSize: 13,
  },
  chipTextBold: {
    fontWeight: 'bold',
  },
  deleteIcon: { // CHIP X BUTTON
    borderRadius: 50,
    backgroundColor: '#dadada',
    height: 16,
    width: 16,
    overflow: 'hidden',
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: { // FLATLIST
    maxWidth: 215,
    maxHeight: 200,
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: '#444444',
    borderRadius: 4,
    paddingVertical: 5,
  },
  listHeaderText: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listRowContainer: { // ROW PER ITEM
    paddingVertical: 2,
    paddingHorizontal: 20,
  },
  listRowContainerHover: { // ROW HIGHLIGHT
    backgroundColor: '#373737',
  },
  listRowText: { // ROW INNER TEXT
    color: '#ffffff',
  },
  listRowTextHover: {
    fontWeight: 'bold',
  },
})
