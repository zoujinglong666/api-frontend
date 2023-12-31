// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: any;
  }>('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<any>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取接口列表 GET  */
export async function ListInterfaceInfo(
  params: { pageSize: number; page: number },
  options?: { [p: string]: any },
) {
  return request<any>('/api/interfaceInfo/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addInterfaceInfo(body: any, options?: { [key: string]: any }) {
  return request<any>('/api/interfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateInterfaceInfo(body: any, options?: { [key: string]: any }) {
  return request<any>('/api/interfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function delInterfaceInfo(body: any, options?: { [key: string]: any }) {
  console.log(body);
  return request<any>('/api/interfaceInfo/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function removeInterfaceInfoByIds(body: any, options?: { [key: string]: any }) {
  console.log(body);
  return request<any>('/api/interfaceInfo/removeIds', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function onlineInterfaceInfo(body: any, options?: { [key: string]: any }) {
  return request<any>('/api/interfaceInfo/online', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function offlineInterfaceInfo(body: any, options?: { [key: string]: any }) {
  return request<any>('/api/interfaceInfo/offline', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
