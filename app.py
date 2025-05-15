#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request
from datetime import datetime

app = Flask(__name__)


@app.route('/')
def home():
    """Render the home page of the portfolio."""
    return render_template('index.html', title='الرئيسية', current_year=datetime.now().year)


@app.route('/about')
def about():
    """Render the about me page."""
    return render_template('about.html', title='من أنا', current_year=datetime.now().year)


@app.route('/projects')
def projects():
    """Render the projects page."""
    projects_list = [
        {
            'title': 'موقع متجر إلكتروني',
            'description': 'متجر إلكتروني متكامل مع نظام دفع وإدارة مخزون.',
            'image': 'https://via.placeholder.com/300x200',
            'link': '#',
            'category': 'web'
        },
        {
            'title': 'تطبيق إدارة المهام',
            'description': 'تطبيق ويب لإدارة المهام والمشاريع بواجهة سهلة الاستخدام.',
            'image': 'https://via.placeholder.com/300x200',
            'link': '#',
            'category': 'web'
        },
        {
            'title': 'تطبيق موبايل للياقة البدنية',
            'description': 'تطبيق للهواتف الذكية لمتابعة التمارين الرياضية والنظام الغذائي.',
            'image': 'https://via.placeholder.com/300x200',
            'link': '#',
            'category': 'mobile'
        },
        {
            'title': 'موقع شركة عقارات',
            'description': 'موقع لشركة عقارات مع نظام بحث متقدم وعرض العقارات.',
            'image': 'https://via.placeholder.com/300x200',
            'link': '#',
            'category': 'web'
        },
        {
            'title': 'هوية بصرية لشركة ناشئة',
            'description': 'تصميم هوية بصرية كاملة لشركة تكنولوجيا ناشئة.',
            'image': 'https://via.placeholder.com/300x200',
            'link': '#',
            'category': 'design'
        },
        {
            'title': 'تطبيق لوحة تحكم إدارية',
            'description': 'لوحة تحكم إدارية متكاملة لإدارة المبيعات والعملاء.',
            'image': 'https://via.placeholder.com/300x200',
            'link': '#',
            'category': 'web'
        }
    ]
    return render_template('projects.html', title='المشاريع', projects=projects_list, current_year=datetime.now().year)


@app.route('/contact')
def contact():
    """Render the contact page."""
    return render_template('contact.html', title='اتصل بي', current_year=datetime.now().year)


@app.route('/services')
def services():
    """Render the services page."""
    return render_template('services.html', title='خدماتي', current_year=datetime.now().year)


@app.route('/testimonials')
def testimonials():
    """Render the testimonials page."""
    return render_template('testimonials.html', title='آراء العملاء', current_year=datetime.now().year)


@app.route('/blog')
def blog():
    """Render the blog page."""
    return render_template('blog.html', title='المدونة', current_year=datetime.now().year)


@app.route('/skills')
def skills():
    """Render the skills and certifications page."""
    return render_template('skills.html', title='المهارات والشهادات', current_year=datetime.now().year)


@app.route('/downloads')
def downloads():
    """Render the downloads page."""
    return render_template('downloads.html', title='التحميلات', current_year=datetime.now().year)


if __name__ == '__main__':
    app.run(debug=True)