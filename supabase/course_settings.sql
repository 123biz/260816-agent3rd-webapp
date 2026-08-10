-- 강의 전체 맵에서 "오늘 진행 세션"을 저장하는 테이블.
-- Supabase 대시보드 > SQL Editor에서 한 번만 실행하면 됩니다.

create table if not exists course_settings (
  id int primary key default 1,
  current_session int not null default 1,
  updated_at timestamptz default now()
);

insert into course_settings (id, current_session)
values (1, 1)
on conflict (id) do nothing;

alter table course_settings enable row level security;

-- 학생 화면(비로그인, anon key)에서도 현재 세션을 읽을 수 있어야 함
create policy "course_settings_select_all"
  on course_settings for select
  using (true);

-- 세션 변경은 /admin에 로그인한 관리자만 가능
create policy "course_settings_update_authenticated"
  on course_settings for update
  using (auth.role() = 'authenticated');
