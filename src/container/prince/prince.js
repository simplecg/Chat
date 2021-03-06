import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import './prince.less'

class GeniusInfo extends Component {
  constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc:''
    }
    this.selectPic = this.selectPic.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
	}

  render() {
    // console.log(this.props)
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div className="princeInfo">
        {
          redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null
        }
        <NavBar mode="dark" >王子资料详情</NavBar>
        <AvatarSelector
          selectAvatar={(imgname)=>this.selectPic(imgname)}
        ></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title',v)}>
          择偶标准 :
        </InputItem>
        <TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='个人介绍 :'
				>
				</TextareaItem>
        <Button 
          onClick={this.handleUpdate}
          type="primary"
        >
          保存
        </Button>
      </div>
    )
  }

  onChange(key,val){
		this.setState({
			[key]:val
		})
  }

  selectPic(imgname) {
    this.setState({
      avatar: imgname
    })
  }

  handleUpdate() {
    this.props.updateInfo(this.state)
  }
  
}

const mapState = (state) => {
  return {
    redirectTo: state.user.redirectTo
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateInfo(info) {
      dispatch(update(info))
    }
  }
}

export default connect(mapState, mapDispatch)(GeniusInfo)